/* The E Chronicles — Firebase realtime data layer */
(function(){
  const config = {
    apiKey: "AIzaSyD1xxmJivDtrfR9cuVs0QOaujMd0OViFjo",
    authDomain: "e-chronicles.firebaseapp.com",
    projectId: "e-chronicles",
    storageBucket: "e-chronicles.firebasestorage.app",
    messagingSenderId: "486633435395",
    appId: "1:486633435395:web:f40211b7d6966c7cfdb936"
  };
  if (!window.firebase) throw new Error('Firebase SDK not loaded');
  if (!firebase.apps.length) firebase.initializeApp(config);
  const db = firebase.firestore();
  // Some networks/proxies interrupt Firestore's default WebChannel streaming transport.
  // Force HTTP long-polling before any reads, listeners, or writes are started.
  db.settings({ experimentalForceLongPolling: true });
  const auth = firebase.auth();
  const COLLECTION = 'siteData';
  const KNOWN_KEYS = [
    'notices','resources','events','achievements','memories','birthdays','schedule',
    'hiddenDays','countdown','driveScriptUrl','driveFolder','memberPhotos','gallery'
  ];
  let cache = null;
  let unsubscribe = null;
  let readyPromise = null;
  let remoteSeeded = false;

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

  async function readRemote(){
    const snap = await db.collection(COLLECTION).get();
    const data = {};
    snap.forEach(doc => { data[doc.id] = doc.data().value; });
    remoteSeeded = !snap.empty;
    return {data, seeded: remoteSeeded};
  }

  async function loadSiteData(){
    if (cache) return cache;
    if (!readyPromise) readyPromise = (async()=>{
      const fallback = await localFallback();
      try {
        const remote = await readRemote();
        cache = remote.seeded ? {...fallback, ...remote.data} : fallback;
      } catch(e){
        console.warn('[EC Firebase] remote read failed; using bundled data', e);
        cache = fallback;
      }
      return cache;
    })();
    return readyPromise;
  }

  function subscribe(callback){
    if(unsubscribe) unsubscribe();
    unsubscribe = db.collection(COLLECTION).onSnapshot(async snap => {
      if(snap.empty){ remoteSeeded = false; return; }
      remoteSeeded = true;
      const next = {...(cache || await localFallback())};
      snap.forEach(doc => { next[doc.id] = doc.data().value; });
      cache = next;
      window.dispatchEvent(new CustomEvent('ec-data-updated',{detail:{data:next}}));
      if(callback) callback(next);
    }, err => {
      console.warn('[EC Firebase] realtime listener error', err);
      window.dispatchEvent(new CustomEvent('ec-data-error',{detail:{error:err}}));
    });
    return unsubscribe;
  }

  async function saveField(key, value){
    if(!KNOWN_KEYS.includes(key)) throw new Error('Unknown data field: '+key);
    if(!auth.currentUser) throw new Error('You are not signed in to Firebase.');
    const write = db.collection(COLLECTION).doc(key).set(
      {value, updatedAt:firebase.firestore.FieldValue.serverTimestamp()},
      {merge:true}
    );
    // Never leave the admin UI stuck on “Saving live…” forever.
    await Promise.race([
      write,
      new Promise((_, reject) => setTimeout(
        () => reject(new Error('Firebase write timed out. Check Firestore, network access, and security rules.')),
        15000
      ))
    ]);
    cache = {...(cache||{}), [key]:value};
    return true;
  }

  async function seed(data){
    const remote = await readRemote();
    if(remote.seeded) return false;
    const batch = db.batch();
    KNOWN_KEYS.forEach(key => {
      if(data[key] !== undefined) batch.set(db.collection(COLLECTION).doc(key), {value:data[key], updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    });
    await batch.commit();
    cache = {...data};
    remoteSeeded = true;
    return true;
  }

  async function signIn(email,password){ return auth.signInWithEmailAndPassword(email,password); }
  async function signOut(){ return auth.signOut(); }
  function currentUser(){ return auth.currentUser; }
  function onAuthStateChanged(cb){ return auth.onAuthStateChanged(cb); }
  function isSeeded(){ return remoteSeeded; }

  window.ECFirebase = {config,db,auth,KNOWN_KEYS,loadSiteData,subscribe,saveField,seed,signIn,signOut,currentUser,onAuthStateChanged,isSeeded};
})();
