/**
 * THE E CHRONICLES — Unified Hindu Festival Celebration Engine
 * St. Xavier's College • Section E Community
 *
 * Curated immersive celebrations for:
 *   1. Dashain (बडा दशैँ)
 *   2. Tihar & Deepawali (तिहार / दीपावली)
 *   3. Chhath Puja (छठ पर्व)
 *   4. Saraswati Puja / Basant Panchami (श्रीपञ्चमी)
 *   5. Maha Shivaratri (महाशिवरात्रि)
 *   6. Holi / Phagu Purnima (फागु पूर्णिमा)
 *
 * Automatic date-triggered popups are active based on Kathmandu time (UTC+05:45).
 * Preview anytime via: `?festival=tihar` (or dashain, chhath, saraswati, shivaratri, holi)
 * Force popup anytime via: `?force_popup=1`
 */
(function () {
  if (window.__HINDU_FESTIVALS_INITIALIZED__) return;
  window.__HINDU_FESTIVALS_INITIALIZED__ = true;

  // ═══════════════════════════════════════════════════════════════
  // 1. NEPAL FESTIVAL CALENDAR SCHEDULE (2024–2030)
  // ═══════════════════════════════════════════════════════════════
  const FESTIVAL_CALENDAR = {
    dashain: [
      { year: 2024, start: "2024-10-03", end: "2024-10-16", mainDay: "2024-10-12" },
      { year: 2025, start: "2025-09-22", end: "2025-10-06", mainDay: "2025-10-02" },
      { year: 2026, start: "2026-10-11", end: "2026-10-25", mainDay: "2026-10-21" },
      { year: 2027, start: "2027-09-30", end: "2027-10-14", mainDay: "2027-10-10" },
      { year: 2028, start: "2028-10-18", end: "2028-10-31", mainDay: "2028-10-28" },
      { year: 2029, start: "2029-10-07", end: "2029-10-20", mainDay: "2029-10-17" },
      { year: 2030, start: "2030-09-27", end: "2030-10-10", mainDay: "2030-10-06" }
    ],
    tihar: [
      { year: 2024, start: "2024-10-29", end: "2024-11-03", mainDay: "2024-10-31" },
      { year: 2025, start: "2025-10-20", end: "2025-10-24", mainDay: "2025-10-21" },
      { year: 2026, start: "2026-11-07", end: "2026-11-12", mainDay: "2026-11-08" },
      { year: 2027, start: "2027-10-28", end: "2027-11-02", mainDay: "2027-10-29" },
      { year: 2028, start: "2028-11-15", end: "2028-11-20", mainDay: "2028-11-16" },
      { year: 2029, start: "2029-11-04", end: "2029-11-09", mainDay: "2029-11-05" },
      { year: 2030, start: "2030-10-25", end: "2030-10-30", mainDay: "2030-10-26" }
    ],
    chhath: [
      { year: 2024, start: "2024-11-05", end: "2024-11-08", mainDay: "2024-11-07" },
      { year: 2025, start: "2025-10-25", end: "2025-10-28", mainDay: "2025-10-27" },
      { year: 2026, start: "2026-11-13", end: "2026-11-16", mainDay: "2026-11-15" },
      { year: 2027, start: "2027-11-02", end: "2027-11-05", mainDay: "2027-11-04" },
      { year: 2028, start: "2028-11-20", end: "2028-11-23", mainDay: "2028-11-22" },
      { year: 2029, start: "2029-11-09", end: "2029-11-12", mainDay: "2029-11-11" },
      { year: 2030, start: "2030-10-29", end: "2030-11-01", mainDay: "2030-10-31" }
    ],
    saraswati: [
      { year: 2025, start: "2025-02-01", end: "2025-02-03", mainDay: "2025-02-02" },
      { year: 2026, start: "2026-01-22", end: "2026-01-24", mainDay: "2026-01-23" },
      { year: 2027, start: "2027-02-10", end: "2027-02-12", mainDay: "2027-02-11" },
      { year: 2028, start: "2028-01-30", end: "2028-02-01", mainDay: "2028-01-31" },
      { year: 2029, start: "2029-02-17", end: "2029-02-19", mainDay: "2029-02-18" },
      { year: 2030, start: "2030-02-07", end: "2030-02-09", mainDay: "2030-02-08" }
    ],
    shivaratri: [
      { year: 2025, start: "2025-02-25", end: "2025-02-27", mainDay: "2025-02-26" },
      { year: 2026, start: "2026-02-14", end: "2026-02-16", mainDay: "2026-02-15" },
      { year: 2027, start: "2027-03-05", end: "2027-03-07", mainDay: "2027-03-06" },
      { year: 2028, start: "2028-02-22", end: "2028-02-24", mainDay: "2028-02-23" },
      { year: 2029, start: "2029-03-12", end: "2029-03-14", mainDay: "2029-03-13" },
      { year: 2030, start: "2030-03-02", end: "2030-03-04", mainDay: "2030-03-03" }
    ],
    holi: [
      { year: 2025, start: "2025-03-12", end: "2025-03-15", mainDay: "2025-03-13" },
      { year: 2026, start: "2026-03-01", end: "2026-03-04", mainDay: "2026-03-02" },
      { year: 2027, start: "2027-03-20", end: "2027-03-23", mainDay: "2027-03-21" },
      { year: 2028, start: "2028-03-09", end: "2028-03-12", mainDay: "2028-03-10" },
      { year: 2029, start: "2029-03-28", end: "2029-03-31", mainDay: "2029-03-29" },
      { year: 2030, start: "2030-03-18", end: "2030-03-21", mainDay: "2030-03-19" }
    ]
  };

  // ═══════════════════════════════════════════════════════════════
  // 2. FESTIVAL PROFILES & MEMORIES (SECTION E CURATED)
  // ═══════════════════════════════════════════════════════════════
  const FESTIVAL_PROFILES = {
    tihar: {
      key: "tihar",
      badge: "✨ St. Xavier's College • Section E ✨",
      title: "शुभ दीपावली & तिहार",
      subtitle: "Festival of Lights • Laxmi Puja & Bhai Tika",
      mainMessage: "May the divine glow of Deepawali illuminate our classroom memories, late-night study sessions, and every grand dream we chase!",
      pillText: "🪔 Happy Diwali!",
      bgGrad: "radial-gradient(circle at center, rgba(38, 12, 68, 0.94) 0%, rgba(12, 4, 24, 0.98) 100%)",
      accentColor: "#ffd76b",
      particleTheme: "fireworks",
      wishes: [
        "✨ May your hard work turn into top ranks and your dreams into stethoscopes & blueprints!",
        "🪔 May the bonds of Section E shine brighter than a thousand golden lamps.",
        "🎆 Health, laughter, boundless peace, and unforgettable memories for you and your family.",
        "🌺 From biology lab records to lifelong friendships, Happy Tihar & Diwali!",
        "💫 Wherever life takes us after SXC, may our Section E spark never fade."
      ]
    },
    dashain: {
      key: "dashain",
      badge: "🚩 St. Xavier's College • Section E 🚩",
      title: "बडा दशैँ तथा विजया दशमी",
      subtitle: "Festival of Triumph, Family & Blessings",
      mainMessage: "May Goddess Durga Bhavani bless our Section E family with triumphant courage, soaring heights, and unforgettable celebrations!",
      pillText: "🪁 Happy Dashain!",
      bgGrad: "radial-gradient(circle at center, rgba(68, 12, 20, 0.94) 0%, rgba(20, 3, 6, 0.98) 100%)",
      accentColor: "#ff4d6d",
      particleTheme: "dashain",
      wishes: [
        "🌿 आरोग्य, ऐश्वर्य, यश र कीर्तिले तपाईं र सम्पूर्ण परिवारलाई सधैं घेरोस्!",
        "🪁 From classroom chaos to great heights, may our Section E kites fly highest in the sky!",
        "🌾 अक्षता र जमराको पवित्र आशीर्वाद — may every obstacle turn into a stepping stone.",
        "🥁 Celebrating the courage of Durga Bhavani with our Section E brothers and sisters!",
        "❤️ May the festive feast, family warmth, and ping swings recharge us with boundless joy."
      ]
    },
    chhath: {
      key: "chhath",
      badge: "🌅 St. Xavier's College • Section E 🌅",
      title: "छठ पर्वको शुभकामना",
      subtitle: "Sacred Homage to Surya Dev & Chhathi Maiya",
      mainMessage: "Offering our deepest gratitude to the Sun that sustains life. May purity, devotion, and radiant vitality guide each of our paths!",
      pillText: "🌅 शुभ छठ पर्व!",
      bgGrad: "radial-gradient(circle at center, rgba(65, 25, 5, 0.94) 0%, rgba(20, 8, 2, 0.98) 100%)",
      accentColor: "#ffa94d",
      particleTheme: "chhath",
      wishes: [
        "☀️ May the divine radiance of the setting and rising sun bless your studies and aspirations.",
        "🍪 Sweetness of Thekua, purity of the riverbanks, and the unwavering discipline of Section E!",
        "🌊 May Chhathi Maiya grant good health, wisdom, and inner peace to your entire home.",
        "🌾 May our friendships remain as enduring and pure as the sacred Ganga and Bagmati arghya.",
        "✨ Gratitude for yesterday's lessons, and devotion toward tomorrow's rising dawn."
      ]
    },
    saraswati: {
      key: "saraswati",
      badge: "📚 St. Xavier's College • Section E 📚",
      title: "श्रीपञ्चमी & सरस्वती पूजा",
      subtitle: "Basant Panchami • Festival of Knowledge & Arts",
      mainMessage: "May Mother Saraswati place her hand of wisdom upon our pens, notebooks, and minds as we prepare to conquer our biggest exams!",
      pillText: "🌸 शुभ वसन्त पञ्चमी!",
      bgGrad: "radial-gradient(circle at center, rgba(55, 45, 10, 0.94) 0%, rgba(18, 15, 3, 0.98) 100%)",
      accentColor: "#ffe066",
      particleTheme: "saraswati",
      wishes: [
        "📖 May Goddess Saraswati sharpen our focus, calm our exam jitters, and guide our minds to excellence!",
        "🎶 May curiosity compose the melody of our youth, and integrity guide our ambitions.",
        "🌼 Spring has arrived in Section E! Let fresh ideas bloom in every lesson and project.",
        "🔬 Here's to every dissected specimen, solved equation, and creative spark we shared.",
        "✨ May the wisdom gained at St. Xavier's shine as a beacon throughout our careers."
      ]
    },
    shivaratri: {
      key: "shivaratri",
      badge: "🔱 St. Xavier's College • Section E 🔱",
      title: "महाशिवरात्रि",
      subtitle: "The Great Night of Shiva • Cosmic Balance & Stillness",
      mainMessage: "May Lord Mahadev's infinite consciousness remove all inner doubts and bestow strength, calmness, and unwavering determination upon Section E!",
      pillText: "🔱 हर हर महादेव!",
      bgGrad: "radial-gradient(circle at center, rgba(15, 25, 45, 0.94) 0%, rgba(4, 7, 16, 0.98) 100%)",
      accentColor: "#74c0fc",
      particleTheme: "shivaratri",
      wishes: [
        "ॐ नमः शिवाय! May your mind remain as steady as Mount Kailash during life's greatest tests.",
        "🔥 May the sacred Dhuni fire burn away stress, uncertainty, and negative thoughts.",
        "🌿 Purity of bilva leaves and the peaceful grace of Mahadev protect you and your loved ones.",
        "🌙 Embrace silence, find clarity, and awaken the relentless powerhouse inside you.",
        "🔱 Har Har Mahadev to our resilient Section E brothers and sisters!"
      ]
    },
    holi: {
      key: "holi",
      badge: "🎨 St. Xavier's College • Section E 🎨",
      title: "फागु पूर्णिमा & होली",
      subtitle: "Festival of Vibrant Colors, Love & Renewal",
      mainMessage: "Paint away every worry with the bright gulal of friendship! Let Section E celebrate the most joyous, colorful bond under the sun!",
      pillText: "🎨 Happy Holi!",
      bgGrad: "radial-gradient(circle at center, rgba(50, 15, 40, 0.94) 0%, rgba(16, 5, 14, 0.98) 100%)",
      accentColor: "#ff7ac6",
      particleTheme: "holi",
      wishes: [
        "🌈 May the rainbow colors of Holi brighten your dreams and fill your heart with laughter!",
        "💦 Red for passion, yellow for intellect, green for growth, and blue for serenity in Section E!",
        "🎉 Forgetting small grudges, celebrating big smiles — that is the true Section E spirit!",
        "🌸 Wishing you and your family a safe, colorful, and tremendously energetic Phagu Purnima!",
        "🥳 Best wishes to our future doctors, engineers, creators, and forever friends!"
      ]
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // 3. DATE DETECTION ENGINE (KATHMANDU TIMEZONE)
  // ═══════════════════════════════════════════════════════════════
  function getActiveFestival() {
    const urlParams = new URLSearchParams(window.location.search);
    const override = urlParams.get("festival");
    if (override && FESTIVAL_PROFILES[override.toLowerCase()]) {
      const key = override.toLowerCase();
      return { key: key, profile: FESTIVAL_PROFILES[key], year: new Date().getFullYear(), isOverride: true };
    }

    // Kathmandu Date
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kathmandu",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(new Date());
      const part = Object.fromEntries(parts.map(p => [p.type, p.value]));
      const y = Number(part.year);
      const m = part.month;
      const d = part.day;
      const todayStr = `${y}-${m}-${d}`;

      for (const [key, windows] of Object.entries(FESTIVAL_CALENDAR)) {
        const match = windows.find(w => todayStr >= w.start && todayStr <= w.end);
        if (match) {
          return { key: key, profile: FESTIVAL_PROFILES[key], year: y, isOverride: false };
        }
      }
    } catch (e) {
      // Fallback to local device date if Intl timezone fails
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      const todayStr = `${y}-${m}-${d}`;

      for (const [key, windows] of Object.entries(FESTIVAL_CALENDAR)) {
        const match = windows.find(w => todayStr >= w.start && todayStr <= w.end);
        if (match) {
          return { key: key, profile: FESTIVAL_PROFILES[key], year: y, isOverride: false };
        }
      }
    }

    return null;
  }

  const activeFestival = getActiveFestival();
  if (!activeFestival) return; // Silent outside festival window

  const P = activeFestival.profile;
  const storageKey = `ec_fest_${activeFestival.key}_${activeFestival.year}`;

  // ═══════════════════════════════════════════════════════════════
  // 4. WEB AUDIO SYNTHESIZER (BELLS, CHIMES, VEENA, DRUMS, SHANKHA)
  // ═══════════════════════════════════════════════════════════════
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainLevel) {
    if (!soundEnabled || !audioCtx) return;
    try {
      freq = freq || 440;
      type = type || "sine";
      duration = duration || 1.0;
      gainLevel = gainLevel || 0.15;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playTempleBell() {
    if (!soundEnabled || !audioCtx) return;
    playTone(440, "sine", 2.2, 0.22);
    setTimeout(() => playTone(880, "sine", 1.8, 0.12), 40);
    setTimeout(() => playTone(1320, "sine", 1.4, 0.08), 80);
  }

  function playSparkleFanfare() {
    if (!soundEnabled || !audioCtx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chords.forEach((f, i) => {
      setTimeout(() => playTone(f, "triangle", 1.2, 0.15), i * 85);
    });
  }

  function playDeusiBeats() {
    if (!soundEnabled || !audioCtx) return;
    // Authentic Madal rhythm sync: Dha-Ting-Na-Ka
    const beats = [
      { f: 120, d: 0.25, g: 0.25, delay: 0 },
      { f: 130, d: 0.2, g: 0.2, delay: 150 },
      { f: 220, d: 0.35, g: 0.18, delay: 300 },
      { f: 110, d: 0.3, g: 0.22, delay: 500 },
      { f: 440, d: 0.4, g: 0.12, delay: 650 }
    ];
    beats.forEach(b => {
      setTimeout(() => playTone(b.f, "sine", b.d, b.g), b.delay);
    });
  }

  function playShankhaDrone() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(235, audioCtx.currentTime + 1.2);
      osc.frequency.linearRampToValueAtTime(220, audioCtx.currentTime + 2.2);
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.2);
    } catch (e) {}
  }

  function playVeenaPluck(freq) {
    if (!soundEnabled || !audioCtx) return;
    try {
      // Plucked string emulation using dual oscillator
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.22, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 1.4);
      osc2.stop(audioCtx.currentTime + 1.4);
    } catch (e) {}
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. DOM MOUNT & COMPONENT INITIALIZATION
  // ═══════════════════════════════════════════════════════════════
  function mount() {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", mount, { once: true });
      return;
    }

    // --- Inject Styles ---
    const styleEl = document.createElement("style");
    styleEl.id = "hindu-festivals-styles";
    styleEl.textContent = `
      .ec-fest-backdrop {
        position: fixed; inset: 0; z-index: 999999;
        background: ${P.bgGrad};
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; opacity: 0; visibility: hidden;
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease;
        box-sizing: border-box;
        font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
      }
      .ec-fest-backdrop.active { opacity: 1; visibility: visible; }

      .ec-fest-canvas {
        position: absolute; inset: 0; pointer-events: none; width: 100%; height: 100%; z-index: 1;
      }

      .ec-fest-card {
        position: relative; z-index: 2; width: 100%; max-width: 580px; max-height: 92vh;
        overflow-y: auto; overflow-x: hidden;
        background: linear-gradient(145deg, rgba(28, 14, 46, 0.88), rgba(10, 4, 18, 0.96));
        border: 1.5px solid ${P.accentColor}55;
        border-radius: 28px; padding: 2.2rem 2rem 2rem; color: #fbf7ff; text-align: center;
        box-shadow: 0 25px 80px -15px ${P.accentColor}33, 0 0 50px rgba(139, 92, 246, 0.2);
        transform: scale(0.92) translateY(20px);
        transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .ec-fest-backdrop.active .ec-fest-card { transform: scale(1) translateY(0); }

      .ec-fest-corner {
        position: absolute; width: 55px; height: 55px; opacity: 0.35; pointer-events: none;
        color: ${P.accentColor};
      }
      .ec-corner-tl { top: 12px; left: 12px; }
      .ec-corner-tr { top: 12px; right: 12px; transform: rotate(90deg); }

      .ec-fest-sound-btn, .ec-fest-close-btn {
        position: absolute; top: 16px; width: 38px; height: 38px; border-radius: 50%;
        background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15);
        color: #fbf7ff; display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s ease; z-index: 10;
        font-size: 0.95rem;
      }
      .ec-fest-sound-btn { right: 60px; }
      .ec-fest-close-btn { right: 16px; font-weight: bold; }
      .ec-fest-sound-btn:hover, .ec-fest-close-btn:hover {
        background: rgba(255, 255, 255, 0.2); transform: scale(1.08);
      }

      .ec-fest-badge {
        display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px;
        border-radius: 999px; background: ${P.accentColor}18; border: 1px solid ${P.accentColor}55;
        color: ${P.accentColor}; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em;
        text-transform: uppercase; margin-bottom: 0.8rem;
        box-shadow: 0 0 15px ${P.accentColor}25;
      }

      .ec-fest-title {
        font-family: 'Fraunces', Georgia, serif; font-size: clamp(1.8rem, 4.5vw, 2.5rem);
        font-weight: 900; margin: 0 0 0.3rem;
        background: linear-gradient(135deg, #ffffff 0%, ${P.accentColor} 50%, #ff8c42 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        letter-spacing: -0.02em; text-shadow: 0 0 35px ${P.accentColor}44;
      }

      .ec-fest-subtitle {
        font-size: 0.92rem; color: #d6c4ff; margin: 0 0 1.1rem; font-weight: 500;
        letter-spacing: 0.02em;
      }

      .ec-fest-message {
        font-size: 0.96rem; line-height: 1.6; color: #ede4fc; margin: 0 auto 1.3rem; max-width: 480px;
        background: rgba(255, 255, 255, 0.04); padding: 0.9rem 1.2rem; border-radius: 16px;
        border: 1px solid rgba(196, 167, 255, 0.15); font-style: italic;
      }

      /* CENTERPIECE INTERACTION BOX */
      .ec-fest-centerpiece {
        background: rgba(12, 5, 22, 0.7);
        border: 1px solid ${P.accentColor}44;
        border-radius: 22px; padding: 1.2rem 1rem; margin-bottom: 1.3rem;
        box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.5);
      }
      .ec-centerpiece-header {
        font-size: 0.82rem; font-weight: 600; color: ${P.accentColor}; margin-bottom: 0.9rem;
        text-transform: uppercase; letter-spacing: 0.08em;
      }

      /* TIHAR: DIYAS */
      .ec-diyas-row {
        display: flex; justify-content: center; align-items: flex-end; gap: clamp(8px, 2.5vw, 20px);
        padding: 0.3rem 0 0.1rem;
      }
      .ec-diya-item {
        cursor: pointer; display: flex; flex-direction: column; align-items: center;
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        user-select: none; padding: 4px;
      }
      .ec-diya-item:hover { transform: translateY(-4px) scale(1.05); }
      .ec-diya-item:active { transform: scale(0.95); }

      .ec-diya-flame {
        width: 15px; height: 26px;
        background: radial-gradient(ellipse at bottom, #ffffff 10%, #ffe600 45%, #ff5d00 80%, transparent 100%);
        border-radius: 50% 50% 35% 35% / 70% 70% 30% 30%;
        margin-bottom: -4px; opacity: 0.15; transform: scale(0.4);
        filter: blur(0.5px); transition: all 0.4s ease; position: relative;
      }
      .ec-diya-item.lit .ec-diya-flame {
        opacity: 1; transform: scale(1);
        box-shadow: 0 -8px 25px rgba(255, 150, 0, 0.9), 0 -12px 40px rgba(255, 80, 0, 0.6);
        animation: ecFlameFlicker 1.8s infinite ease-in-out alternate;
      }
      @keyframes ecFlameFlicker {
        0% { transform: scale(1) rotate(-1.5deg); }
        50% { transform: scale(1.08, 0.96) rotate(1.5deg); }
        100% { transform: scale(0.95, 1.05) rotate(-0.5deg); }
      }
      .ec-diya-base {
        width: 48px; height: 18px;
        background: linear-gradient(180deg, #d97706 0%, #92400e 60%, #451a03 100%);
        border-radius: 0 0 50px 50px; border-top: 2px solid #fef3c7;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
      }
      .ec-diya-label {
        font-size: 0.72rem; color: #f5d0fe; margin-top: 6px; font-weight: 500;
        transition: color 0.3s;
      }
      .ec-diya-item.lit .ec-diya-label { color: ${P.accentColor}; font-weight: 700; }

      /* DASHAIN: PING SWING & TIKA */
      .ec-ping-stage {
        height: 100px; display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden; margin-bottom: 0.6rem;
      }
      .ec-ping-rope {
        font-size: 3.5rem; display: inline-block; transform-origin: top center;
        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .ec-tika-jamara {
        display: flex; justify-content: center; gap: 14px; margin-top: 0.5rem;
      }
      .ec-dashain-badge {
        padding: 6px 14px; border-radius: 999px; background: rgba(255, 77, 109, 0.15);
        border: 1px solid rgba(255, 77, 109, 0.4); font-size: 0.8rem; color: #ff8fa3;
      }

      /* CHHATH: SOOP & OFFERINGS */
      .ec-soop-stage {
        display: flex; flex-direction: column; align-items: center; gap: 10px;
      }
      .ec-soop-basket {
        width: 100%; max-width: 380px; min-height: 52px; border-radius: 16px;
        background: rgba(255, 169, 77, 0.12); border: 1.5px dashed rgba(255, 169, 77, 0.5);
        display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap;
        padding: 8px 12px;
      }
      .ec-soop-item-chip {
        font-size: 1.4rem; padding: 4px 8px; border-radius: 10px;
        background: rgba(255, 255, 255, 0.08); animation: ecPop 0.3s ease;
      }
      @keyframes ecPop { 0% { transform: scale(0.6); } 100% { transform: scale(1); } }
      .ec-offerings-grid {
        display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;
      }
      .ec-offering-btn {
        background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 169, 77, 0.35);
        color: #ffe8cc; padding: 7px 12px; border-radius: 12px; font-size: 0.82rem;
        cursor: pointer; display: flex; align-items: center; gap: 6px;
        transition: all 0.2s ease;
      }
      .ec-offering-btn.added {
        background: rgba(255, 169, 77, 0.25); border-color: #ffa94d; color: #ffa94d;
      }

      /* SARASWATI: PLAYABLE VEENA STRINGS */
      .ec-veena-strings {
        display: flex; justify-content: center; gap: clamp(8px, 2vw, 14px);
        padding: 0.5rem 0;
      }
      .ec-veena-string {
        flex: 1; max-width: 70px; height: 80px;
        background: linear-gradient(180deg, rgba(255, 224, 102, 0.1) 0%, rgba(255, 224, 102, 0.25) 50%, rgba(255, 224, 102, 0.1) 100%);
        border: 1px solid rgba(255, 224, 102, 0.4); border-radius: 14px;
        display: flex; flex-direction: column; align-items: center; justify-content: space-between;
        padding: 8px 4px; cursor: pointer; transition: all 0.2s ease;
      }
      .ec-veena-string:hover {
        background: rgba(255, 224, 102, 0.3); transform: translateY(-3px);
      }
      .ec-veena-string:active { transform: scale(0.96); }
      .ec-string-swar { font-size: 1.1rem; font-weight: bold; color: #ffe066; }
      .ec-string-key { font-size: 0.7rem; color: #fdf2b8; opacity: 0.8; }

      /* SHIVARATRI: JALABHISHEKA & DHUNI */
      .ec-shiva-stage {
        display: flex; justify-content: center; align-items: center; gap: 24px; padding: 0.4rem 0;
      }
      .ec-linga-box {
        font-size: 3rem; position: relative; cursor: pointer; user-select: none;
        transition: transform 0.2s;
      }
      .ec-linga-box:hover { transform: scale(1.08); }
      .ec-dhuni-box {
        font-size: 2.8rem; cursor: pointer; user-select: none;
        filter: drop-shadow(0 0 15px rgba(255, 120, 0, 0.7));
        animation: ecDhuniGlow 2s infinite alternate ease-in-out;
      }
      @keyframes ecDhuniGlow {
        0% { transform: scale(1); filter: drop-shadow(0 0 12px rgba(255, 100, 0, 0.5)); }
        100% { transform: scale(1.06); filter: drop-shadow(0 0 25px rgba(255, 160, 0, 0.9)); }
      }

      /* HOLI: GULAL PALETTE */
      .ec-gulal-palette {
        display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; padding: 0.3rem 0;
      }
      .ec-gulal-dish {
        width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
        border: 2.5px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .ec-gulal-dish:hover { transform: scale(1.15) translateY(-3px); }
      .ec-gulal-dish.selected {
        border-color: #ffffff; transform: scale(1.2);
        box-shadow: 0 0 20px currentColor;
      }

      /* STATUS / INTERACTION TEXT */
      .ec-fest-status {
        min-height: 22px; font-size: 0.85rem; color: ${P.accentColor}; margin: 0.6rem 0 0;
        font-weight: 600; letter-spacing: 0.02em; transition: opacity 0.2s ease;
      }

      /* ACTION BUTTONS */
      .ec-fest-actions {
        display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
      }
      .ec-fest-btn {
        flex: 1; min-width: 170px; padding: 12px 20px; border-radius: 14px;
        font-size: 0.92rem; font-weight: 700; cursor: pointer;
        display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        text-transform: uppercase; letter-spacing: 0.04em;
      }
      .ec-btn-primary {
        background: linear-gradient(135deg, ${P.accentColor} 0%, #ff8c42 100%);
        color: #120418; border: none;
        box-shadow: 0 8px 25px ${P.accentColor}44;
      }
      .ec-btn-primary:hover {
        transform: translateY(-2px); box-shadow: 0 12px 30px ${P.accentColor}66;
      }
      .ec-btn-secondary {
        background: rgba(255, 255, 255, 0.07); color: #fbf7ff;
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
      .ec-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15); transform: translateY(-2px);
      }

      /* FLOATING LAUNCHER PILL */
      .ec-fest-launcher {
        position: fixed; bottom: 24px; right: 24px; z-index: 99998;
        background: linear-gradient(135deg, rgba(30, 10, 50, 0.92), rgba(14, 5, 24, 0.96));
        border: 1.5px solid ${P.accentColor}66;
        padding: 10px 20px; border-radius: 999px; color: ${P.accentColor};
        font-family: 'Space Grotesk', system-ui, sans-serif;
        font-size: 0.88rem; font-weight: 700; cursor: pointer;
        display: flex; align-items: center; gap: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px ${P.accentColor}33;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .ec-fest-launcher:hover {
        transform: translateY(-3px) scale(1.04);
        box-shadow: 0 14px 35px rgba(0, 0, 0, 0.6), 0 0 35px ${P.accentColor}55;
      }
      .ec-launcher-pulse {
        width: 8px; height: 8px; border-radius: 50%; background: ${P.accentColor};
        box-shadow: 0 0 10px ${P.accentColor};
        animation: ecPulse 1.8s infinite;
      }
      @keyframes ecPulse {
        0% { transform: scale(0.9); opacity: 0.6; }
        50% { transform: scale(1.4); opacity: 1; }
        100% { transform: scale(0.9); opacity: 0.6; }
      }
      @media (max-width: 500px) {
        .ec-fest-card { padding: 1.8rem 1.2rem; }
        .ec-fest-actions { flex-direction: column; }
        .ec-fest-btn { width: 100%; min-width: auto; }
        .ec-fest-launcher { bottom: 16px; right: 16px; padding: 8px 16px; font-size: 0.82rem; }
      }
    `;
    document.head.appendChild(styleEl);

    // --- Corner Rangoli SVG ---
    const cornerSvg = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10C35 10 50 25 50 50C50 25 65 10 90 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10 10C10 35 25 50 50 50C25 50 10 65 10 90" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="12" stroke="currentColor" stroke-width="2"/>
        <circle cx="50" cy="50" r="4" fill="currentColor"/>
      </svg>
    `;

    // --- Centerpiece Dynamic Template ---
    let centerpieceHTML = "";
    if (activeFestival.key === "tihar") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🪔 Light the 5 Diyas of Section E (0/5)</div>
        <div class="ec-diyas-row">
          <div class="ec-diya-item" data-diya="0" title="Diya of Wisdom">
            <div class="ec-diya-flame"></div>
            <div class="ec-diya-base"></div>
            <span class="ec-diya-label">Wisdom</span>
          </div>
          <div class="ec-diya-item" data-diya="1" title="Diya of Friendship">
            <div class="ec-diya-flame"></div>
            <div class="ec-diya-base"></div>
            <span class="ec-diya-label">Bond</span>
          </div>
          <div class="ec-diya-item" data-diya="2" title="Diya of Ambition">
            <div class="ec-diya-flame"></div>
            <div class="ec-diya-base"></div>
            <span class="ec-diya-label">Dreams</span>
          </div>
          <div class="ec-diya-item" data-diya="3" title="Diya of Health">
            <div class="ec-diya-flame"></div>
            <div class="ec-diya-base"></div>
            <span class="ec-diya-label">Health</span>
          </div>
          <div class="ec-diya-item" data-diya="4" title="Diya of Success">
            <div class="ec-diya-flame"></div>
            <div class="ec-diya-base"></div>
            <span class="ec-diya-label">Success</span>
          </div>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Tap each lamp to illuminate our classroom memories!</div>
      `;
    } else if (activeFestival.key === "dashain") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🌾 Dashain Ashirwad & Festive Swing</div>
        <div class="ec-ping-stage">
          <div class="ec-ping-rope" id="ecPingSwing">🪁</div>
        </div>
        <div class="ec-tika-jamara">
          <span class="ec-dashain-badge">🔴 रातो टीका (Courage)</span>
          <span class="ec-dashain-badge">🌾 पहेँलो जमरा (Prosperity)</span>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Tap the swing to lift higher over the hills!</div>
      `;
    } else if (activeFestival.key === "chhath") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🌅 Sacred Daura & Soop Offering</div>
        <div class="ec-soop-stage">
          <div class="ec-soop-basket" id="ecSoopBasket">
            <span style="font-size:0.82rem; opacity:0.7;">(Tap offerings below to place into the holy soop)</span>
          </div>
          <div class="ec-offerings-grid">
            <button class="ec-offering-btn" data-item="🍪 Thekua"><span>🍪</span> Thekua</button>
            <button class="ec-offering-btn" data-item="🎋 Sugarcane"><span>🎋</span> Ukhu</button>
            <button class="ec-offering-btn" data-item="🍌 Kera"><span>🍌</span> Banana</button>
            <button class="ec-offering-btn" data-item="🪔 Diya"><span>🪔</span> Pradeep</button>
          </div>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Prepare the sacred basket with pure devotion.</div>
      `;
    } else if (activeFestival.key === "saraswati") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🎶 Sacred Veena of Saraswati (Keys 1–5 or Tap)</div>
        <div class="ec-veena-strings">
          <div class="ec-veena-string" data-swar="सा" data-freq="261.63"><span class="ec-string-swar">सा</span><span class="ec-string-key">1</span></div>
          <div class="ec-veena-string" data-swar="रे" data-freq="293.66"><span class="ec-string-swar">रे</span><span class="ec-string-key">2</span></div>
          <div class="ec-veena-string" data-swar="ग" data-freq="329.63"><span class="ec-string-swar">ग</span><span class="ec-string-key">3</span></div>
          <div class="ec-veena-string" data-swar="म" data-freq="349.23"><span class="ec-string-swar">म</span><span class="ec-string-key">4</span></div>
          <div class="ec-veena-string" data-swar="प" data-freq="392.00"><span class="ec-string-swar">प</span><span class="ec-string-key">5</span></div>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Pluck the golden strings for wisdom, focus and creativity!</div>
      `;
    } else if (activeFestival.key === "shivaratri") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🔱 Jalabhisheka & The Sacred Night Fire</div>
        <div class="ec-shiva-stage">
          <div class="ec-linga-box" id="ecLingaBox" title="Tap to offer holy water & bilva leaves">🪨</div>
          <div class="ec-dhuni-box" id="ecDhuniBox" title="Tap to tend the Dhuni fire">🔥</div>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Tap the Shivalinga to offer holy water; tap the Dhuni to tend the fire.</div>
      `;
    } else if (activeFestival.key === "holi") {
      centerpieceHTML = `
        <div class="ec-centerpiece-header" id="ecCenterHeader">🎨 Choose Gulal Powder & Splash</div>
        <div class="ec-gulal-palette">
          <div class="ec-gulal-dish selected" style="background:#ff0055;" data-color="#ff0055" title="Crimson Red"></div>
          <div class="ec-gulal-dish" style="background:#ffbe0b;" data-color="#ffbe0b" title="Golden Yellow"></div>
          <div class="ec-gulal-dish" style="background:#06d6a0;" data-color="#06d6a0" title="Emerald Green"></div>
          <div class="ec-gulal-dish" style="background:#3a86ff;" data-color="#3a86ff" title="Electric Blue"></div>
          <div class="ec-gulal-dish" style="background:#8338ec;" data-color="#8338ec" title="Deep Violet"></div>
          <div class="ec-gulal-dish" style="background:#fb5607;" data-color="#fb5607" title="Saffron Orange"></div>
        </div>
        <div class="ec-fest-status" id="ecCenterStatus">Click a color dish or anywhere on screen to splash gulal!</div>
      `;
    }

    // --- Action Button Labels ---
    let btn1Label = "🎆 Celebrate";
    let btn2Label = "💌 Next Batch Wish";
    if (activeFestival.key === "tihar") {
      btn1Label = "🥁 Deusi-Bhailo Beat";
      btn2Label = "💌 Next Diwali Wish";
    } else if (activeFestival.key === "dashain") {
      btn1Label = "🪁 Fly Kites";
      btn2Label = "🌿 Next Ashirwad";
    } else if (activeFestival.key === "chhath") {
      btn1Label = "🌊 Offer Arghya";
      btn2Label = "☀️ Chhath Blessings";
    } else if (activeFestival.key === "saraswati") {
      btn1Label = "📖 Blessings for Vidya";
      btn2Label = "🌸 Next Wish";
    } else if (activeFestival.key === "shivaratri") {
      btn1Label = "🔔 Ring Temple Bell";
      btn2Label = "🔱 Mahadev's Blessings";
    } else if (activeFestival.key === "holi") {
      btn1Label = "💦 Throw Color Splash";
      btn2Label = "🎨 Next Holi Wish";
    }

    // --- Construct HTML ---
    const modalHTML = `
      <div class="ec-fest-backdrop" id="ecFestBackdrop" role="dialog" aria-modal="true">
        <canvas class="ec-fest-canvas" id="ecFestCanvas"></canvas>
        <div class="ec-fest-card" id="ecFestCard">
          <div class="ec-fest-corner ec-corner-tl">${cornerSvg}</div>
          <div class="ec-fest-corner ec-corner-tr">${cornerSvg}</div>

          <button class="ec-fest-sound-btn" id="ecSoundToggle" title="Toggle audio">🔔</button>
          <button class="ec-fest-close-btn" id="ecCloseBtn" title="Close">✕</button>

          <div class="ec-fest-badge">${P.badge}</div>
          <h2 class="ec-fest-title">${P.title}</h2>
          <div class="ec-fest-subtitle">${P.subtitle}</div>

          <p class="ec-fest-message" id="ecDynamicWish">"${P.mainMessage}"</p>

          <div class="ec-fest-centerpiece">
            ${centerpieceHTML}
          </div>

          <div class="ec-fest-actions">
            <button class="ec-fest-btn ec-btn-primary" id="ecActionBtn1">
              <span>${btn1Label}</span>
            </button>
            <button class="ec-fest-btn ec-btn-secondary" id="ecActionBtn2">
              <span>${btn2Label}</span>
            </button>
          </div>
        </div>
      </div>

      <button class="ec-fest-launcher" id="ecFestLauncher" title="Open Festival Celebration">
        <span class="ec-launcher-pulse"></span>
        <span>${P.pillText}</span>
      </button>
    `;

    const container = document.createElement("div");
    container.innerHTML = modalHTML;
    document.body.appendChild(container);

    // ═══════════════════════════════════════════════════════════════
    // 6. CANVAS PARTICLES SYSTEM (ADAPTIVE TO FESTIVAL)
    // ═══════════════════════════════════════════════════════════════
    const canvas = document.getElementById("ecFestCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId = null;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor(x, y, color, theme) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.theme = theme;
        this.alpha = 1;

        if (theme === "fireworks") {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 6.5;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.radius = 2 + Math.random() * 2.5;
          this.decay = 0.012 + Math.random() * 0.016;
          this.gravity = 0.07;
        } else if (theme === "dashain") {
          // Floating kites and marigold/jamara petals
          this.vx = -1.5 + Math.random() * 3;
          this.vy = -2 - Math.random() * 4;
          this.radius = 3 + Math.random() * 3.5;
          this.decay = 0.009 + Math.random() * 0.012;
          this.gravity = 0.03;
          this.rotation = Math.random() * Math.PI;
          this.rotSpeed = -0.05 + Math.random() * 0.1;
        } else if (theme === "chhath") {
          // Sunbeam golden embers and water reflections
          this.vx = -0.8 + Math.random() * 1.6;
          this.vy = -1 - Math.random() * 2.5;
          this.radius = 2.5 + Math.random() * 3;
          this.decay = 0.008 + Math.random() * 0.014;
          this.gravity = -0.02; // floats upward gently
        } else if (theme === "saraswati") {
          // Yellow mustard blossom petals gently swaying down
          this.vx = -0.5 + Math.random() * 1.0;
          this.vy = 0.8 + Math.random() * 2.2;
          this.radius = 3 + Math.random() * 3;
          this.decay = 0.006 + Math.random() * 0.01;
          this.gravity = 0.01;
          this.rotation = Math.random() * Math.PI;
          this.rotSpeed = 0.02;
        } else if (theme === "shivaratri") {
          // Sacred Dhuni fire embers rising to the night stars
          this.vx = -1 + Math.random() * 2;
          this.vy = -2.5 - Math.random() * 4;
          this.radius = 1.8 + Math.random() * 2.8;
          this.decay = 0.009 + Math.random() * 0.015;
          this.gravity = -0.04;
        } else if (theme === "holi") {
          // Volumetric gulal powder blast
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 8;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.radius = 4 + Math.random() * 7;
          this.decay = 0.015 + Math.random() * 0.02;
          this.gravity = 0.05;
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= this.decay;
        if (this.rotation !== undefined) this.rotation += this.rotSpeed;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);

        if (this.theme === "dashain" && this.rotation !== undefined) {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.fillStyle = this.color;
          // Draw diamond kite shape
          ctx.beginPath();
          ctx.moveTo(0, -this.radius * 1.5);
          ctx.lineTo(this.radius, 0);
          ctx.lineTo(0, this.radius * 1.5);
          ctx.lineTo(-this.radius, 0);
          ctx.closePath();
          ctx.fill();
        } else if (this.theme === "saraswati") {
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.radius, this.radius * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function burstParticles(x, y, count, overrideColor) {
      const colors = {
        fireworks: ["#ffd76b", "#ff9e00", "#ff007f", "#00f0ff", "#a855f7", "#ffffff", "#ff4500"],
        dashain: ["#ff4d6d", "#ffb703", "#55a630", "#ffffff", "#ffd166"],
        chhath: ["#ffa94d", "#ff922b", "#ffd43b", "#ffe066", "#ffffff"],
        saraswati: ["#ffe066", "#fab005", "#ffd43b", "#ffffff", "#c0eb75"],
        shivaratri: ["#74c0fc", "#4dabf7", "#ffd43b", "#ff922b", "#e7f5ff"],
        holi: ["#ff0055", "#ffbe0b", "#06d6a0", "#3a86ff", "#8338ec", "#fb5607"]
      }[P.particleTheme] || ["#ffd76b", "#ffffff"];

      for (let i = 0; i < count; i++) {
        const c = overrideColor || colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, c, P.particleTheme));
      }
      if (!animId) loopCanvas();
    }

    function loopCanvas() {
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      if (particles.length > 0) {
        animId = requestAnimationFrame(loopCanvas);
      } else {
        animId = null;
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. INTERACTION CONTROLLER & LOGIC
    // ═══════════════════════════════════════════════════════════════
    const backdrop = document.getElementById("ecFestBackdrop");
    const closeBtn = document.getElementById("ecCloseBtn");
    const soundBtn = document.getElementById("ecSoundToggle");
    const launcherBtn = document.getElementById("ecFestLauncher");
    const actionBtn1 = document.getElementById("ecActionBtn1");
    const actionBtn2 = document.getElementById("ecActionBtn2");
    const dynamicWish = document.getElementById("ecDynamicWish");
    const centerHeader = document.getElementById("ecCenterHeader");
    const centerStatus = document.getElementById("ecCenterStatus");

    function openModal() {
      initAudio();
      backdrop.classList.add("active");
      playTempleBell();
      burstParticles(W / 2, H * 0.35, 45);
    }

    function closeModal() {
      backdrop.classList.remove("active");
      if (!activeFestival.isOverride) {
        try {
          localStorage.setItem(storageKey, "1");
        } catch (e) {}
      }
    }

    backdrop.addEventListener("click", e => {
      if (e.target === backdrop) closeModal();
    });
    closeBtn.addEventListener("click", closeModal);
    launcherBtn.addEventListener("click", openModal);

    soundBtn.addEventListener("click", () => {
      initAudio();
      soundEnabled = !soundEnabled;
      soundBtn.textContent = soundEnabled ? "🔔" : "🔕";
    });

    // --- FESTIVAL SPECIFIC HOOKS ---
    if (activeFestival.key === "tihar") {
      let litCount = 0;
      const diyaItems = document.querySelectorAll(".ec-diya-item");
      diyaItems.forEach(diya => {
        diya.addEventListener("click", () => {
          initAudio();
          const rect = diya.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          if (!diya.classList.contains("lit")) {
            diya.classList.add("lit");
            litCount++;
            playTone(480 + litCount * 90, "sine", 1.2, 0.2);
            burstParticles(cx, cy, 25, "#ffd76b");

            if (litCount === diyaItems.length) {
              centerHeader.innerHTML = "✨ All 5 Lamps Lit! Section E is Illuminated! ✨";
              centerStatus.textContent = "May the golden light of Deepawali protect and bless our classroom bonds!";
              playSparkleFanfare();
              setTimeout(() => burstParticles(W * 0.3, H * 0.35, 45), 100);
              setTimeout(() => burstParticles(W * 0.7, H * 0.35, 45), 300);
            } else {
              centerHeader.textContent = `🪔 Light the 5 Diyas of Section E (${litCount}/5)`;
              centerStatus.textContent = `${litCount} of 5 lamps burning bright! Keep illuminating!`;
            }
          } else {
            playTone(700, "triangle", 0.4, 0.12);
            burstParticles(cx, cy, 15, "#ffd76b");
          }
        });
      });

      // Deusi-Bhailo Beat Button
      actionBtn1.addEventListener("click", () => {
        initAudio();
        playDeusiBeats();
        centerStatus.textContent = "🥁 भन भन भाइहो — देउसीरे! राम्ररी भन — देउसीरे! Section E को आँगन — देउसीरे!";
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            burstParticles(W * (0.25 + Math.random() * 0.5), H * (0.2 + Math.random() * 0.3), 35);
          }, i * 200);
        }
      });
    } else if (activeFestival.key === "dashain") {
      let swingAngle = 0;
      const pingSwing = document.getElementById("ecPingSwing");
      function pushSwing() {
        initAudio();
        swingAngle = swingAngle === 22 ? -22 : 22;
        pingSwing.style.transform = `rotate(${swingAngle}deg) scale(1.1)`;
        playTone(330, "sine", 0.8, 0.15);
        burstParticles(W / 2, H * 0.35, 25);
        centerStatus.textContent = "🪁 झ्वाम्म-झ्वाम्म पिङ हल्लियो! Changa soaring high over the Kathmandu hills!";
        setTimeout(() => {
          pingSwing.style.transform = "rotate(0deg) scale(1)";
        }, 600);
      }
      pingSwing.addEventListener("click", pushSwing);

      actionBtn1.addEventListener("click", () => {
        pushSwing();
        playSparkleFanfare();
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            burstParticles(W * (0.2 + Math.random() * 0.6), H * (0.15 + Math.random() * 0.3), 30);
          }, i * 180);
        }
      });
    } else if (activeFestival.key === "chhath") {
      const basket = document.getElementById("ecSoopBasket");
      const offeringBtns = document.querySelectorAll(".ec-offering-btn");
      const addedItems = new Set();

      offeringBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          initAudio();
          const itemName = btn.dataset.item;
          if (!addedItems.has(itemName)) {
            addedItems.add(itemName);
            btn.classList.add("added");
            playTone(520, "sine", 0.9, 0.18);
            burstParticles(W / 2, H * 0.45, 18);

            const chip = document.createElement("span");
            chip.className = "ec-soop-item-chip";
            chip.textContent = itemName;
            if (addedItems.size === 1) basket.innerHTML = "";
            basket.appendChild(chip);

            centerStatus.textContent = `${addedItems.size}/4 sacred offerings placed into the soop.`;
            if (addedItems.size === 4) {
              centerHeader.textContent = "🌅 Soop Prepared with Love & Pure Devotion! 🌅";
              playShankhaDrone();
            }
          }
        });
      });

      actionBtn1.addEventListener("click", () => {
        initAudio();
        playShankhaDrone();
        centerStatus.textContent = "🌅 अर्घ्य offered to Lord Surya! May the rising sun bring radiant health to Section E!";
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            burstParticles(W * (0.25 + Math.random() * 0.5), H * (0.2 + Math.random() * 0.3), 35, "#ffa94d");
          }, i * 220);
        }
      });
    } else if (activeFestival.key === "saraswati") {
      const strings = document.querySelectorAll(".ec-veena-string");
      function triggerString(el) {
        initAudio();
        const swar = el.dataset.swar;
        const freq = parseFloat(el.dataset.freq);
        playVeenaPluck(freq);
        el.style.transform = "translateY(3px)";
        setTimeout(() => (el.style.transform = ""), 150);
        burstParticles(W / 2, H * 0.35, 15, "#ffe066");
        centerStatus.textContent = `🎶 Swar '${swar}' struck with grace. May your mind be sharp and peaceful!`;
      }

      strings.forEach(s => s.addEventListener("click", () => triggerString(s)));
      document.addEventListener("keydown", e => {
        if (/^[1-5]$/.test(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (strings[idx]) triggerString(strings[idx]);
        }
      });

      actionBtn1.addEventListener("click", () => {
        initAudio();
        playSparkleFanfare();
        centerStatus.textContent = "📖 Pens, stethoscopes, lab records & dreams blessed by Goddess Saraswati!";
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            burstParticles(W * (0.2 + Math.random() * 0.6), H * (0.2 + Math.random() * 0.3), 35, "#ffe066");
          }, i * 200);
        }
      });
    } else if (activeFestival.key === "shivaratri") {
      const linga = document.getElementById("ecLingaBox");
      const dhuni = document.getElementById("ecDhuniBox");

      linga.addEventListener("click", () => {
        initAudio();
        playTempleBell();
        burstParticles(W * 0.42, H * 0.42, 25, "#74c0fc");
        centerStatus.textContent = "💧 Sacred Jalabhisheka offered. Calmness, focus and inner peace to Section E!";
      });

      dhuni.addEventListener("click", () => {
        initAudio();
        playTone(110, "sawtooth", 0.6, 0.15);
        burstParticles(W * 0.58, H * 0.42, 30, "#ff922b");
        centerStatus.textContent = "🔥 The holy Dhuni ember burns bright under the Shivaratri night sky.";
      });

      actionBtn1.addEventListener("click", () => {
        initAudio();
        playTempleBell();
        centerStatus.textContent = "ॐ नमः शिवाय! May Mahadev grant courage and triumph in all endeavors.";
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            burstParticles(W * (0.2 + Math.random() * 0.6), H * (0.2 + Math.random() * 0.3), 35);
          }, i * 200);
        }
      });
    } else if (activeFestival.key === "holi") {
      let activeColor = "#ff0055";
      const dishes = document.querySelectorAll(".ec-gulal-dish");
      dishes.forEach(dish => {
        dish.addEventListener("click", () => {
          dishes.forEach(d => d.classList.remove("selected"));
          dish.classList.add("selected");
          activeColor = dish.dataset.color;
          initAudio();
          playTone(550, "sine", 0.3, 0.15);
          centerStatus.textContent = `Color selected! Tap anywhere on the card to throw ${dish.title} gulal!`;
        });
      });

      function splashGulal(x, y) {
        initAudio();
        playTone(420, "triangle", 0.4, 0.16);
        burstParticles(x, y, 45, activeColor);
        centerStatus.textContent = "🎉 Gulal splashed with joyful laughter across Section E!";
      }

      document.getElementById("ecFestCard").addEventListener("click", e => {
        if (!e.target.closest("button") && !e.target.closest(".ec-gulal-dish")) {
          splashGulal(e.clientX, e.clientY);
        }
      });

      actionBtn1.addEventListener("click", () => {
        splashGulal(W / 2, H * 0.38);
      });
    }

    // --- WISH CYCLER (BUTTON 2) ---
    let wishIndex = 0;
    actionBtn2.addEventListener("click", () => {
      initAudio();
      playTone(880, "sine", 0.7, 0.12);
      wishIndex = (wishIndex + 1) % P.wishes.length;
      dynamicWish.style.opacity = "0";
      dynamicWish.style.transform = "translateY(5px)";
      setTimeout(() => {
        dynamicWish.textContent = `"${P.wishes[wishIndex]}"`;
        dynamicWish.style.transition = "all 0.3s ease";
        dynamicWish.style.opacity = "1";
        dynamicWish.style.transform = "translateY(0)";
      }, 200);
    });

    // ═══════════════════════════════════════════════════════════════
    // 8. AUTO-SHOW SCHEDULER
    // ═══════════════════════════════════════════════════════════════
    function triggerAutoShow() {
      const urlParams = new URLSearchParams(window.location.search);
      const forcePopup = urlParams.get("force_popup") === "true" || urlParams.get("force_popup") === "1";
      if (activeFestival.isOverride || forcePopup) {
        setTimeout(openModal, 650);
        return;
      }
      let hasSeen = null;
      try {
        hasSeen = localStorage.getItem(storageKey);
      } catch (e) {}

      if (!hasSeen) {
        setTimeout(openModal, 1200);
      }
    }

    if (document.readyState === "complete") {
      triggerAutoShow();
    } else {
      window.addEventListener("load", triggerAutoShow, { once: true });
    }
  }

  // Mount when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
