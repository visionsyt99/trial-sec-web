/* The E Chronicles — Firebase realtime data layer
 *
 * IMPORTANT: Firestore WebChannel/compat transport was hanging in some browsers
 * for this project. Authentication still uses Firebase Auth, but Firestore data
 * is accessed through the official Firestore REST API. This avoids the hanging
 * WebChannel completely while keeping the same Firestore database and rules.
 */
(function(){
  'use strict';

  const config = {
    apiKey: "AIzaSyD1xxmJivDtrfR9cuVs0QOaujMd0OViFjo",
    authDomain: "e-chronicles.firebaseapp.com",
    projectId: "e-chronicles",
    storageBucket: "e-chronicles.firebasestorage.app",
    messagingSenderId: "486633435395",
    appId: "1:486633435395:web:f40211b7d6966c7cfdb936"
  };

  if (!window.firebase) throw new Error('Firebase Auth SDK not loaded');
  if (!firebase.apps.length) firebase.initializeApp(config);

  const auth = firebase.auth();
  const COLLECTION = 'siteData';
  const REST_BASE = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/${COLLECTION}`;
  const KNOWN_KEYS = [
    'notices','resources','events','achievements','memories','birthdays','schedule',
    'hiddenDays','countdown','driveScriptUrl','driveFolder','memberPhotos','gallery'
  ];

  let cache = null;
  let pollTimer = null;
  let pollInFlight = false;
  let remoteSeeded = false;
  let authReady = null;

  const jsonEqual = (a,b) => {
    try { return JSON.stringify(a) === JSON.stringify(b); }
    catch(e) { return false; }
  };

  function withTimeout(promise, ms, label){
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(label)), ms))
    ]);
  }

  async function waitForAuth(timeoutMs=10000){
    if (auth.currentUser) return auth.currentUser;
    if (!authReady) {
      authReady = new Promise(resolve => {
        const off = auth.onAuthStateChanged(user => { off(); resolve(user); });
      });
    }
    const user = await withTimeout(authReady, timeoutMs, 'Firebase authentication is taking too long.');
    return user;
  }

  async function idToken(required=true){
    const user = await waitForAuth();
    if (!user) {
      if(required) throw new Error('You are not signed in to Firebase.');
      return null;
    }
    return user.getIdToken(false);
  }

  function toFirestoreValue(value){
    if (value === null) return {nullValue:null};
    if (value === undefined) return {nullValue:null};
    if (typeof value === 'boolean') return {booleanValue:value};
    if (typeof value === 'string') return {stringValue:value};
    if (typeof value === 'number') {
      if (!Number.isFinite(value)) return {nullValue:null};
      if (Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER) return {integerValue:String(value)};
      return {doubleValue:value};
    }
    if (Array.isArray(value)) return {arrayValue:{values:value.map(toFirestoreValue)}};
    if (typeof value === 'object') {
      const fields = {};
      Object.keys(value).forEach(k => { fields[k] = toFirestoreValue(value[k]); });
      return {mapValue:{fields}};
    }
    return {stringValue:String(value)};
  }

  function fromFirestoreValue(v){
    if (!v) return null;
    if ('nullValue' in v) return null;
    if ('booleanValue' in v) return v.booleanValue;
    if ('stringValue' in v) return v.stringValue;
    if ('integerValue' in v) {
      const n = Number(v.integerValue);
      return Number.isSafeInteger(n) ? n : v.integerValue;
    }
    if ('doubleValue' in v) return v.doubleValue;
    if ('timestampValue' in v) return v.timestampValue;
    if ('referenceValue' in v) return v.referenceValue;
    if ('bytesValue' in v) return v.bytesValue;
    if ('geoPointValue' in v) return v.geoPointValue;
    if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromFirestoreValue);
    if ('mapValue' in v) {
      const out = {};
      Object.entries(v.mapValue.fields || {}).forEach(([k,val]) => out[k] = fromFirestoreValue(val));
      return out;
    }
    return null;
  }

  async function restFetch(url, options={}){
    const headers = new Headers(options.headers || {});
    headers.set('Accept','application/json');
    if(options.body) headers.set('Content-Type','application/json');
    const res = await withTimeout(fetch(url, {...options, headers, cache:'no-store'}), 15000,
      'Firestore REST request timed out.');
    const text = await res.text();
    let body = null;
    try { body = text ? JSON.parse(text) : null; } catch(e) { body = text; }
    if(!res.ok){
      const message = body?.error?.message || `Firestore REST request failed (${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.details = body;
      throw err;
    }
    return body;
  }

  async function listRemote(){
    // Reads are allowed publicly by the project's Firestore rules. We still
    // attach the admin token when available so authenticated admin reads use
    // exactly the same identity as writes.
    const token = await idToken(false);
    const headers = token ? {Authorization:`Bearer ${token}`} : {};
    const body = await restFetch(`${REST_BASE}?pageSize=100`, {headers});
    const data = {};
    (body.documents || []).forEach(doc => {
      const name = doc.name.split('/').pop();
      data[name] = fromFirestoreValue(doc.fields?.value);
    });
    remoteSeeded = (body.documents || []).length > 0;
    return {data, seeded:remoteSeeded};
  }

  async function localFallback(){
    try {
      const r = await fetch('data/ec-data.json', {cache:'no-store'});
      if(!r.ok) throw new Error('Bundled data returned '+r.status);
      return await r.json();
    } catch(e){
      console.warn('[EC Firebase] bundled fallback failed', e);
      return {};
    }
  }

  async function loadSiteData(){
    if(cache) return cache;
    const fallback = await localFallback();
    try {
      const remote = await listRemote();
      cache = remote.seeded ? {...fallback, ...remote.data} : fallback;
    } catch(e){
      console.warn('[EC Firebase] REST read failed; using bundled data', e);
      cache = fallback;
    }
    return cache;
  }

  async function pollOnce(callback){
    if(pollInFlight) return;
    pollInFlight = true;
    try {
      const remote = await listRemote();
      if(!remote.seeded) return;
      const next = {...(cache || await localFallback()), ...remote.data};
      if(!jsonEqual(next, cache)){
        cache = next;
        window.dispatchEvent(new CustomEvent('ec-data-updated',{detail:{data:next}}));
        if(callback) callback(next);
      }
    } catch(e){
      console.warn('[EC Firebase] realtime poll failed', e);
      window.dispatchEvent(new CustomEvent('ec-data-error',{detail:{error:e}}));
    } finally {
      pollInFlight = false;
    }
  }

  function subscribe(callback){
    if(pollTimer) clearInterval(pollTimer);
    pollOnce(callback);
    // Near-realtime fallback: refresh every 3 seconds without WebChannel.
    pollTimer = setInterval(() => pollOnce(callback), 3000);
    return () => { if(pollTimer) clearInterval(pollTimer); pollTimer = null; };
  }

  async function saveField(key, value){
    if(!KNOWN_KEYS.includes(key)) throw new Error('Unknown data field: '+key);
    const token = await idToken(true);
    const url = `${REST_BASE}/${encodeURIComponent(key)}`;
    const body = {
      fields: {
        value: toFirestoreValue(value),
        updatedAt: {timestampValue:new Date().toISOString()}
      }
    };
    await restFetch(url, {
      method:'PATCH',
      headers:{Authorization:`Bearer ${token}`},
      body:JSON.stringify(body)
    });
    cache = {...(cache||{}), [key]:value};
    remoteSeeded = true;
    window.dispatchEvent(new CustomEvent('ec-data-updated',{detail:{data:cache}}));
    return true;
  }

  async function seed(data){
    const remote = await listRemote();
    if(remote.seeded) return false;
    for(const key of KNOWN_KEYS){
      if(data[key] !== undefined) await saveField(key, data[key]);
    }
    cache = {...data};
    remoteSeeded = true;
    return true;
  }

  async function signIn(email,password){ return auth.signInWithEmailAndPassword(email,password); }
  async function signOut(){ return auth.signOut(); }
  function currentUser(){ return auth.currentUser; }
  function onAuthStateChanged(cb){ return auth.onAuthStateChanged(cb); }
  function isSeeded(){ return remoteSeeded; }

  window.ECFirebase = {
    config, auth, KNOWN_KEYS, loadSiteData, subscribe, saveField, seed,
    signIn, signOut, currentUser, onAuthStateChanged, isSeeded,
    // Kept for backwards compatibility; Firestore SDK is intentionally not used.
    db: null
  };
})();
