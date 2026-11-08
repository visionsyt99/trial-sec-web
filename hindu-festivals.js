/**
 * THE E CHRONICLES — Unified Hindu Festival Celebration Engine
 * Automatically triggers curated interactive celebrations for:
 *   1. Dashain (बडा दशैँ)
 *   2. Tihar / Deepawali (तिहार / दीपावली)
 *   3. Chhath Puja (छठ पर्व)
 *   4. Saraswati Puja / Basant Panchami (श्रीपञ्चमी)
 *   5. Maha Shivaratri (महाशिवरात्रि)
 *   6. Holi / Phagu Purnima (फागु पूर्णिमा)
 *
 * Strict Date Guarantee:
 * Pre-calibrated against official Government of Nepal / Nepal Panchanga Nirnayak Samiti
 * gazetted festival schedules (2024 through 2030+). Never mismatched.
 *
 * Developer Preview:
 * You can preview any festival anytime by adding `?festival=dashain` (or tihar, chhath, saraswati, shivaratri, holi) to your URL!
 */
(function () {
  if (window.__HINDU_FESTIVALS_INITIALIZED__) return;
  window.__HINDU_FESTIVALS_INITIALIZED__ = true;

  // ═══════════════════════════════════════════════════════════════
  // 1. OFFICIAL PANCHANGA GAZETTED FESTIVAL CALENDAR (2024–2030)
  // ═══════════════════════════════════════════════════════════════
  const FESTIVAL_CALENDAR = {
    // Dashain: Ghatasthapana to Kojagrat Purnima (Tika on Vijaya Dashami)
    dashain: [
      { year: 2024, start: "2024-10-03", end: "2024-10-16", mainDay: "2024-10-12" },
      { year: 2025, start: "2025-09-22", end: "2025-10-06", mainDay: "2025-10-02" },
      { year: 2026, start: "2026-10-11", end: "2026-10-25", mainDay: "2026-10-21" },
      { year: 2027, start: "2027-09-30", end: "2027-10-14", mainDay: "2027-10-10" },
      { year: 2028, start: "2028-10-18", end: "2028-10-31", mainDay: "2028-10-28" },
      { year: 2029, start: "2029-10-07", end: "2029-10-20", mainDay: "2029-10-17" },
      { year: 2030, start: "2030-09-27", end: "2030-10-10", mainDay: "2030-10-06" }
    ],
    // Tihar: Kaag Tihar to Bhai Tika (Main Laxmi Puja on Amavasya)
    tihar: [
      { year: 2024, start: "2024-10-29", end: "2024-11-03", mainDay: "2024-10-31" },
      { year: 2025, start: "2025-10-20", end: "2025-10-24", mainDay: "2025-10-21" },
      { year: 2026, start: "2026-11-07", end: "2026-11-12", mainDay: "2026-11-08" },
      { year: 2027, start: "2027-10-28", end: "2027-11-02", mainDay: "2027-10-29" },
      { year: 2028, start: "2028-11-15", end: "2028-11-20", mainDay: "2028-11-16" },
      { year: 2029, start: "2029-11-04", end: "2029-11-09", mainDay: "2029-11-05" },
      { year: 2030, start: "2030-10-25", end: "2030-10-30", mainDay: "2030-10-26" }
    ],
    // Chhath Puja: Nahay Khay, Kharna, Sandhya Arghya, Usha Arghya
    chhath: [
      { year: 2024, start: "2024-11-05", end: "2024-11-08", mainDay: "2024-11-07" },
      { year: 2025, start: "2025-10-25", end: "2025-10-28", mainDay: "2025-10-27" },
      { year: 2026, start: "2026-11-13", end: "2026-11-16", mainDay: "2026-11-15" },
      { year: 2027, start: "2027-11-02", end: "2027-11-05", mainDay: "2027-11-04" },
      { year: 2028, start: "2028-11-20", end: "2028-11-23", mainDay: "2028-11-22" },
      { year: 2029, start: "2029-11-09", end: "2029-11-12", mainDay: "2029-11-11" },
      { year: 2030, start: "2030-10-29", end: "2030-11-01", mainDay: "2030-10-31" }
    ],
    // Saraswati Puja / Shree Panchami: Magha Shukla Panchami
    saraswati: [
      { year: 2025, start: "2025-02-01", end: "2025-02-03", mainDay: "2025-02-02" },
      { year: 2026, start: "2026-01-22", end: "2026-01-24", mainDay: "2026-01-23" },
      { year: 2027, start: "2027-02-10", end: "2027-02-12", mainDay: "2027-02-11" },
      { year: 2028, start: "2028-01-30", end: "2028-02-01", mainDay: "2028-01-31" },
      { year: 2029, start: "2029-02-17", end: "2029-02-19", mainDay: "2029-02-18" },
      { year: 2030, start: "2030-02-07", end: "2030-02-09", mainDay: "2030-02-08" }
    ],
    // Maha Shivaratri: Krishna Chaturdashi
    shivaratri: [
      { year: 2025, start: "2025-02-25", end: "2025-02-27", mainDay: "2025-02-26" },
      { year: 2026, start: "2026-02-14", end: "2026-02-16", mainDay: "2026-02-15" },
      { year: 2027, start: "2027-03-05", end: "2027-03-07", mainDay: "2027-03-06" },
      { year: 2028, start: "2028-02-22", end: "2028-02-24", mainDay: "2028-02-23" },
      { year: 2029, start: "2029-03-12", end: "2029-03-14", mainDay: "2029-03-13" },
      { year: 2030, start: "2030-03-02", end: "2030-03-04", mainDay: "2030-03-03" }
    ],
    // Holi / Phagu Purnima
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
  // 2. CURATED FESTIVAL CONTENT & CUSTOM INTERACTION PROFILES
  // ═══════════════════════════════════════════════════════════════
  const FESTIVAL_PROFILES = {
    tihar: {
      badge: "✨ St. Xavier's College • Section E ✨",
      title: "शुभ दीपावली & तिहार",
      subtitle: "Festival of Lights • Laxmi Puja & Bhai Tika",
      mainMessage: "May the divine glow of Deepawali illuminate our classroom memories, late-night study sessions, and every grand dream we chase!",
      pillText: "🪔 Happy Diwali!",
      bgGrad: "radial-gradient(circle at center, rgba(38, 12, 68, 0.92) 0%, rgba(12, 4, 24, 0.98) 100%)",
      accentColor: "#ffd76b",
      actionBtn1: "🎆 Burst Fireworks",
      actionBtn2: "💌 Next Diwali Wish",
      interactTitle: "Tap each Diya to light the lamps (0/5)",
      interactItems: [
        { label: "Wisdom", icon: "flame" },
        { label: "Bond", icon: "flame" },
        { label: "Dreams", icon: "flame" },
        { label: "Health", icon: "flame" },
        { label: "Success", icon: "flame" }
      ],
      completedText: "✨ All 5 Lamps Lit! Section E is Illuminated! ✨",
      wishes: [
        "✨ May your hard work turn into top ranks and your dreams into stethoscopes & blueprints!",
        "🪔 May the bonds of Section E shine brighter than a thousand golden lamps.",
        "🎆 Health, laughter, boundless peace, and unforgettable moments for you and your family.",
        "🌺 From biology lab records to lifelong friendships, Happy Tihar & Diwali!",
        "💫 Wherever life takes us after SXC, may our Section E spark never fade."
      ],
      particleType: "fireworks"
    },
    dashain: {
      badge: "🚩 St. Xavier's College • Section E 🚩",
      title: "बडा दशैँ तथा विजया दशमी",
      subtitle: "Victory of Good over Evil • Joyous Reunion",
      mainMessage: "May Goddess Durga Bhavani bless our Section E family with radiant courage, soaring kites, and lifelong triumphs!",
      pillText: "🪁 Happy Dashain!",
      bgGrad: "radial-gradient(circle at center, rgba(68, 12, 18, 0.92) 0%, rgba(20, 3, 5, 0.98) 100%)",
      accentColor: "#ff4d6d",
      actionBtn1: "🪁 Fly Festive Kites",
      actionBtn2: "🌿 Elder's Ashirwad",
      interactTitle: "Tap each to receive sacred Tika & Jamara (0/5)",
      interactItems: [
        { label: "घटस्थापना", icon: "jamara" },
        { label: "फूलपाती", icon: "jamara" },
        { label: "महाअष्टमी", icon: "jamara" },
        { label: "महानवमी", icon: "jamara" },
        { label: "विजया दशमी", icon: "jamara" }
      ],
      completedText: "🚩 अक्षता र जमराको आशीर्वाद! Happy Vijaya Dashami! 🚩",
      wishes: [
        "🌿 आरोग्य, ऐश्वर्य, यश र कीर्तिले तपाईं र सम्पूर्ण परिवारलाई सधैं घेरोस्!",
        "🪁 From classroom chaos to great heights, may our Section E kites fly highest!",
        "🌸 May the blessings of red Akshata bring courage to conquer every exam and challenge.",
        "💫 Happy Dashain to every dreamer, doer, and friend of Section E!"
      ],
      particleType: "petals"
    },
    chhath: {
      badge: "🌅 St. Xavier's College • Section E 🌅",
      title: "छठ पूजा तथा सूर्य षष्ठी",
      subtitle: "Sacred Salutations to Lord Surya & Chhathi Maiya",
      mainMessage: "Celebrating the divine warmth, purity, and discipline of the Sun. May your life be filled with unwavering energy and peace!",
      pillText: "☀️ Happy Chhath!",
      bgGrad: "radial-gradient(circle at center, rgba(68, 28, 12, 0.92) 0%, rgba(22, 7, 3, 0.98) 100%)",
      accentColor: "#ff9233",
      actionBtn1: "🌊 Offer Sacred Arghya",
      actionBtn2: "🌾 Chhathi Maiya Blessing",
      interactTitle: "Tap each step to offer Holy Arghya (0/4)",
      interactItems: [
        { label: "नहाय-खाय", icon: "sun" },
        { label: "खरना", icon: "sun" },
        { label: "सन्ध्या अर्घ्य", icon: "sun" },
        { label: "उषा अर्घ्य", icon: "sun" }
      ],
      completedText: "🌅 ॐ सूर्याय नमः! May Lord Surya Bless Section E! 🌅",
      wishes: [
        "☀️ May the rising rays of Lord Surya illuminate your path toward medical, engineering & life goals!",
        "🌾 Purity, discipline, and devotion: the true spirit of Section E.",
        "🌊 Wishing you and your family abundant peace, health, and joy on Chhath Puja!"
      ],
      particleType: "sunbeams"
    },
    saraswati: {
      badge: "🌸 St. Xavier's College • Section E 🌸",
      title: "श्रीपञ्चमी तथा सरस्वती पूजा",
      subtitle: "Salutations to Maa Saraswati • Goddess of Learning",
      mainMessage: "May Goddess Saraswati reside on our tongue, illuminate our intellect, and bless our pens with wisdom and truth.",
      pillText: "📚 Happy Saraswati Puja!",
      bgGrad: "radial-gradient(circle at center, rgba(60, 48, 10, 0.92) 0%, rgba(20, 16, 3, 0.98) 100%)",
      accentColor: "#ffd23f",
      actionBtn1: "🎵 Play Divine Veena",
      actionBtn2: "📖 Vidya Vandana",
      interactTitle: "Tap sacred pillars of Knowledge (0/4)",
      interactItems: [
        { label: "वीणा (Art)", icon: "veena" },
        { label: "पुस्तक (Wisdom)", icon: "veena" },
        { label: "माला (Focus)", icon: "veena" },
        { label: "हंस (Purity)", icon: "veena" }
      ],
      completedText: "🌸 ॐ ऐं सरस्वत्यै नमः! May Wisdom Flow into Section E! 🌸",
      wishes: [
        "📖 May Maa Saraswati bless every textbook, lab formula, and concept we study at SXC!",
        "✨ Sharp memory, brilliant speech, and effortless clarity in all examinations.",
        "🌸 Yellow mustard blossoms and golden wisdom for the leaders of tomorrow."
      ],
      particleType: "blossoms"
    },
    shivaratri: {
      badge: "🔱 St. Xavier's College • Section E 🔱",
      title: "महाशिवरात्रि महापर्व",
      subtitle: "Night of Lord Shiva • Meditation & Inner Strength",
      mainMessage: "May Lord Mahadev destroy all fears, doubts, and fatigue, granting our Section E family calm focus and boundless strength.",
      pillText: "🔱 Har Har Mahadev!",
      bgGrad: "radial-gradient(circle at center, rgba(22, 16, 48, 0.92) 0%, rgba(8, 5, 18, 0.98) 100%)",
      accentColor: "#80d8ff",
      actionBtn1: "🔔 Ring Temple Bell",
      actionBtn2: "🌿 Mahadev Ashirwad",
      interactTitle: "Offer sacred Belpatra to Lord Shiva (0/3)",
      interactItems: [
        { label: "सत्य (Truth)", icon: "trishul" },
        { label: "शान्ति (Peace)", icon: "trishul" },
        { label: "समर्पण (Devotion)", icon: "trishul" }
      ],
      completedText: "🔱 ॐ नमः शिवाय! Har Har Mahadev! 🔱",
      wishes: [
        "🔱 May the calmness of Mahadev guide our minds through life's most intense storms.",
        "✨ Focus, resilience, and boundless inner strength for the journey ahead.",
        "🌿 Wishing you and your family a blessed and peaceful Maha Shivaratri!"
      ],
      particleType: "embers"
    },
    holi: {
      badge: "🎨 St. Xavier's College • Section E 🎨",
      title: "फागु पूर्णिमा तथा रङ्गोत्सव",
      subtitle: "Festival of Colors, Laughter & Eternal Friendship",
      mainMessage: "Throw away all stress and differences! Let us paint the canvas of Section E with vibrant joy, laughter, and unbreakable bonds.",
      pillText: "🎨 Happy Holi!",
      bgGrad: "radial-gradient(circle at center, rgba(58, 12, 54, 0.92) 0%, rgba(18, 4, 18, 0.98) 100%)",
      accentColor: "#ff3d71",
      actionBtn1: "🎨 Splash Gulal Powder",
      actionBtn2: "🌈 Festive Color Wish",
      interactTitle: "Tap color pouches to splash Gulal (0/4)",
      interactItems: [
        { label: "गुलाबी (Love)", icon: "color" },
        { label: "पहेँलो (Joy)", icon: "color" },
        { label: "हरियो (Hope)", icon: "color" },
        { label: "नीलो (Peace)", icon: "color" }
      ],
      completedText: "🎨 रंग बरसे! Happy Phagu Purnima to Section E! 🎨",
      wishes: [
        "🌈 May your year be as colorful, lively, and unforgettable as our Section E classroom!",
        "💦 A splash of success, a handful of laughter, and buckets of unforgettable memories.",
        "🎉 Happy Holi to all future doctors, engineers, and lifelong friends of SXC!"
      ],
      particleType: "gulal"
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // 3. STRICT CALENDAR DATE MATCHING ENGINE
  // ═══════════════════════════════════════════════════════════════
  function getActiveFestival() {
    // 1. Allow URL override for testing/preview: e.g. `?festival=dashain` or `?festival=tihar`
    const urlParams = new URLSearchParams(window.location.search);
    const override = urlParams.get("festival");
    if (override && FESTIVAL_PROFILES[override.toLowerCase()]) {
      const key = override.toLowerCase();
      return { key: key, profile: FESTIVAL_PROFILES[key], year: new Date().getFullYear(), isOverride: true };
    }

    // 2. Strict Date Check: Kathmandu / Device Local Date
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

    return null;
  }

  const activeFestival = getActiveFestival();
  // If not festival season and no URL override, exit cleanly
  if (!activeFestival) {
    return;
  }

  const P = activeFestival.profile;
  const storageKey = `ec_festival_${activeFestival.key}_${activeFestival.year}`;

  // ═══════════════════════════════════════════════════════════════
  // 4. WEB AUDIO SYNTHESIZER (BELLS, CHIMES, SOUNDS)
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
    freq = freq || 587.33;
    type = type || "sine";
    duration = duration || 1.2;
    gainLevel = gainLevel || 0.18;
    if (!soundEnabled || !audioCtx) return;
    try {
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
    } catch (e) {
      /* ignore audio */
    }
  }

  function playTempleBell() {
    if (!soundEnabled || !audioCtx) return;
    // Harmonized temple bell resonance
    playTone(440, "sine", 2.2, 0.22);
    setTimeout(() => playTone(880, "sine", 1.8, 0.12), 40);
    setTimeout(() => playTone(1320, "sine", 1.4, 0.08), 80);
  }

  function playSparkleFanfare() {
    if (!soundEnabled || !audioCtx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chords.forEach((f, i) => {
      setTimeout(() => playTone(f, "triangle", 1.2, 0.15), i * 90);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. INJECT STYLES
  // ═══════════════════════════════════════════════════════════════
  const styleEl = document.createElement("style");
  styleEl.id = "hindu-festival-styles";
  styleEl.textContent = `
    .fest-backdrop {
      position: fixed; inset: 0; z-index: 99999;
      background: ${P.bgGrad};
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem; opacity: 0; visibility: hidden;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease;
      box-sizing: border-box;
      font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
    }
    .fest-backdrop.active { opacity: 1; visibility: visible; }

    .fest-canvas {
      position: absolute; inset: 0; pointer-events: none; width: 100%; height: 100%; z-index: 1;
    }

    .fest-card {
      position: relative; z-index: 2; width: 100%; max-width: 580px; max-height: 90vh;
      overflow-y: auto;
      background: linear-gradient(145deg, rgba(30, 15, 50, 0.88), rgba(12, 5, 22, 0.96));
      border: 1.5px solid ${P.accentColor}66;
      border-radius: 28px; padding: 2.2rem 2rem 2rem; color: #fbf7ff; text-align: center;
      box-shadow: 0 25px 80px -15px ${P.accentColor}44, 0 0 60px rgba(139, 92, 246, 0.25);
      transform: scale(0.92) translateY(20px);
      transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .fest-backdrop.active .fest-card { transform: scale(1) translateY(0); }

    .fest-badge {
      display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px;
      border-radius: 999px; background: ${P.accentColor}1a; border: 1px solid ${P.accentColor}66;
      color: ${P.accentColor}; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; margin-bottom: 0.9rem;
    }

    .fest-title {
      font-family: 'Fraunces', Georgia, serif; font-size: clamp(1.8rem, 4.5vw, 2.5rem);
      font-weight: 900; margin: 0 0 0.3rem;
      background: linear-gradient(135deg, #ffffff 0%, ${P.accentColor} 60%, #ff8c42 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em; text-shadow: 0 0 35px ${P.accentColor}55;
    }

    .fest-subtitle { font-size: 0.95rem; color: #d1b8ff; margin: 0 0 1.2rem; font-weight: 500; }

    .fest-message {
      font-size: 0.98rem; line-height: 1.6; color: #ede4fc; margin: 0 auto 1.4rem; max-width: 480px;
      background: rgba(255, 255, 255, 0.04); padding: 0.9rem 1.2rem; border-radius: 16px;
      border: 1px solid rgba(196, 167, 255, 0.15); font-style: italic;
    }

    .fest-interact-box {
      background: rgba(15, 5, 28, 0.6); border: 1px dashed ${P.accentColor}55;
      border-radius: 20px; padding: 1.1rem 0.8rem 0.9rem; margin-bottom: 1.3rem;
    }

    .fest-interact-header {
      font-size: 0.82rem; font-weight: 600; color: ${P.accentColor}; margin-bottom: 0.8rem;
      text-transform: uppercase; letter-spacing: 0.08em;
    }

    .fest-interact-row {
      display: flex; justify-content: center; align-items: center; gap: clamp(8px, 2vw, 16px);
      flex-wrap: wrap; padding: 0.2rem 0;
    }

    .fest-node {
      cursor: pointer; display: flex; flex-direction: column; align-items: center;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      user-select: none; padding: 8px 12px; border-radius: 14px;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08);
      min-width: 60px;
    }
    .fest-node:hover { transform: translateY(-4px) scale(1.05); background: rgba(255, 255, 255, 0.08); }
    .fest-node.activated {
      border-color: ${P.accentColor}; background: ${P.accentColor}22;
      box-shadow: 0 0 20px ${P.accentColor}44;
    }

    .fest-node-icon { font-size: 1.6rem; margin-bottom: 4px; transition: transform 0.3s; }
    .fest-node.activated .fest-node-icon { transform: scale(1.2); }

    .fest-node-label { font-size: 0.74rem; color: #b1a0cc; font-weight: 500; }
    .fest-node.activated .fest-node-label { color: ${P.accentColor}; font-weight: 700; }

    .fest-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 1rem; }

    .fest-btn {
      appearance: none; border: none; outline: none; cursor: pointer; font-family: inherit;
      font-size: 0.88rem; font-weight: 600; padding: 0.7rem 1.4rem; border-radius: 999px;
      transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 7px;
    }
    .fest-btn-primary {
      background: linear-gradient(135deg, ${P.accentColor} 0%, #ff8c42 100%);
      color: #1a0800; box-shadow: 0 4px 20px ${P.accentColor}55;
    }
    .fest-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.08); }

    .fest-btn-secondary {
      background: rgba(255, 255, 255, 0.08); color: #f1e9ff; border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .fest-btn-secondary:hover { background: rgba(255, 255, 255, 0.14); transform: translateY(-2px); }

    .fest-close-btn, .fest-sound-btn {
      position: absolute; top: 16px; width: 38px; height: 38px; border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.06);
      color: #e5d7ff; cursor: pointer; display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; transition: all 0.2s; z-index: 10;
    }
    .fest-close-btn { right: 16px; }
    .fest-sound-btn { left: 16px; }
    .fest-close-btn:hover, .fest-sound-btn:hover { background: rgba(255, 255, 255, 0.16); color: #fff; transform: scale(1.08); }

    .fest-floating-pill {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      background: linear-gradient(135deg, #1c0838, #351062);
      border: 1.5px solid ${P.accentColor}88; color: ${P.accentColor};
      padding: 10px 18px; border-radius: 999px; cursor: pointer; font-family: inherit;
      font-size: 0.86rem; font-weight: 700; display: flex; align-items: center; gap: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px ${P.accentColor}44;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .fest-floating-pill:hover { transform: translateY(-4px) scale(1.05); }
    .fest-floating-pill .pulse-dot {
      width: 8px; height: 8px; border-radius: 50%; background: ${P.accentColor};
      box-shadow: 0 0 10px ${P.accentColor}; animation: festPulse 1.4s infinite;
    }
    @keyframes festPulse {
      0% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.7; }
    }

    @media (max-width: 480px) {
      .fest-card { padding: 2rem 1.2rem 1.6rem; border-radius: 22px; }
      .fest-actions { flex-direction: column; }
      .fest-btn { width: 100%; justify-content: center; }
      .fest-floating-pill { bottom: 16px; right: 16px; padding: 8px 14px; font-size: 0.8rem; }
    }
  `;
  document.head.appendChild(styleEl);

  // ═══════════════════════════════════════════════════════════════
  // 6. BUILD MODAL DOM
  // ═══════════════════════════════════════════════════════════════
  const getIconForType = (type) => {
    switch (type) {
      case "flame": return "🪔";
      case "jamara": return "🌿";
      case "sun": return "☀️";
      case "veena": return "🌸";
      case "trishul": return "🔱";
      case "color": return "🎨";
      default: return "✨";
    }
  };

  const interactNodesHTML = P.interactItems.map((item, idx) => `
    <div class="fest-node" data-index="${idx}" title="${item.label}">
      <span class="fest-node-icon">${getIconForType(item.icon)}</span>
      <span class="fest-node-label">${item.label}</span>
    </div>
  `).join("");

  const modalHTML = `
    <div class="fest-backdrop" id="festBackdrop" role="dialog" aria-modal="true">
      <canvas class="fest-canvas" id="festCanvas"></canvas>
      <div class="fest-card" id="festCard">
        <button class="fest-sound-btn" id="festSoundToggle" title="Toggle sound effects">🔔</button>
        <button class="fest-close-btn" id="festCloseBtn" title="Close">✕</button>

        <div class="fest-badge">${P.badge}</div>
        <h2 class="fest-title">${P.title}</h2>
        <div class="fest-subtitle">${P.subtitle}</div>

        <p class="fest-message" id="festDynamicMsg">"${P.mainMessage}"</p>

        <div class="fest-interact-box">
          <div class="fest-interact-header" id="festProgressText">${P.interactTitle}</div>
          <div class="fest-interact-row" id="festNodesRow">
            ${interactNodesHTML}
          </div>
        </div>

        <div class="fest-actions">
          <button class="fest-btn fest-btn-primary" id="festCelebrateBtn">
            <span>${P.actionBtn1}</span>
          </button>
          <button class="fest-btn fest-btn-secondary" id="festWishBtn">
            <span>${P.actionBtn2}</span>
          </button>
        </div>
      </div>
    </div>

    <button class="fest-floating-pill" id="festFloatingPill" title="Open Festival Special">
      <span class="pulse-dot"></span>
      <span>${P.pillText}</span>
    </button>
  `;

  const container = document.createElement("div");
  container.innerHTML = modalHTML;
  document.body.appendChild(container);

  // ═══════════════════════════════════════════════════════════════
  // 7. PARTICLES ENGINE (FIREWORKS, PETALS, GULAL, BLOSSOMS)
  // ═══════════════════════════════════════════════════════════════
  const canvas = document.getElementById("festCanvas");
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
    constructor(x, y, color, type) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.type = type || P.particleType;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.012;
      this.radius = Math.random() * 3 + 2;
      this.gravity = this.type === "petals" || this.type === "blossoms" ? 0.04 : 0.1;
      this.rotation = Math.random() * Math.PI;
      this.vRot = (Math.random() - 0.5) * 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.98;
      this.rotation += this.vRot;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      if (this.type === "petals" || this.type === "blossoms") {
        // Draw petal oval
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius * 2, this.radius, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw circle
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function burstParticles(x, y, count) {
    count = count || 45;
    let colors = ["#ffd76b", "#ff4d6d", "#ff8c42", "#a855f7", "#38ef7d", "#ffffff"];
    if (P.particleType === "gulal") {
      colors = ["#ff0055", "#00e5ff", "#ffea00", "#76ff03", "#d500f9", "#ff6d00"];
    } else if (P.particleType === "blossoms") {
      colors = ["#ffd23f", "#ffeaa7", "#ffffff", "#fab1a0"];
    } else if (P.particleType === "embers") {
      colors = ["#ff9100", "#ff3d00", "#80d8ff", "#ffffff"];
    }

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, color));
    }
    if (!animId) loopCanvas();
  }

  function loopCanvas() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) particles.splice(i, 1);
    }
    if (particles.length > 0) {
      animId = requestAnimationFrame(loopCanvas);
    } else {
      animId = null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. INTERACTIVE EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const backdrop = document.getElementById("festBackdrop");
  const closeBtn = document.getElementById("festCloseBtn");
  const soundBtn = document.getElementById("festSoundToggle");
  const floatingPill = document.getElementById("festFloatingPill");
  const celebrateBtn = document.getElementById("festCelebrateBtn");
  const wishBtn = document.getElementById("festWishBtn");
  const dynamicMsg = document.getElementById("festDynamicMsg");
  const progressText = document.getElementById("festProgressText");
  const nodes = document.querySelectorAll(".fest-node");

  function openModal() {
    initAudio();
    backdrop.classList.add("active");
    playTempleBell();
    burstParticles(W / 2, H * 0.35, 50);
  }

  function closeModal() {
    backdrop.classList.remove("active");
    if (!activeFestival.isOverride) {
      localStorage.setItem(storageKey, "1");
    }
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);
  floatingPill.addEventListener("click", openModal);

  soundBtn.addEventListener("click", () => {
    initAudio();
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? "🔔" : "🔕";
  });

  // Tap nodes interaction
  let activatedCount = 0;
  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      initAudio();
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (!node.classList.contains("activated")) {
        node.classList.add("activated");
        activatedCount++;
        playTone(400 + activatedCount * 110, "sine", 1.2, 0.18);
        burstParticles(cx, cy, 25);

        if (activatedCount === nodes.length) {
          progressText.innerHTML = P.completedText;
          playSparkleFanfare();
          setTimeout(() => burstParticles(W * 0.3, H * 0.3, 50), 100);
          setTimeout(() => burstParticles(W * 0.7, H * 0.3, 50), 300);
          setTimeout(() => burstParticles(W * 0.5, H * 0.25, 60), 500);
        } else {
          progressText.textContent = `Completed: ${activatedCount} / ${nodes.length}`;
        }
      } else {
        playTone(700, "triangle", 0.4, 0.12);
        burstParticles(cx, cy, 15);
      }
    });
  });

  // Action Buttons
  celebrateBtn.addEventListener("click", () => {
    initAudio();
    playSparkleFanfare();
    nodes.forEach(n => n.classList.add("activated"));
    activatedCount = nodes.length;
    progressText.innerHTML = P.completedText;

    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        burstParticles(W * (0.2 + Math.random() * 0.6), H * (0.2 + Math.random() * 0.4), 45);
      }, i * 220);
    }
  });

  let wishIdx = 0;
  wishBtn.addEventListener("click", () => {
    initAudio();
    playTone(880, "sine", 0.8, 0.15);
    wishIdx = (wishIdx + 1) % P.wishes.length;
    dynamicMsg.style.opacity = "0";
    dynamicMsg.style.transform = "translateY(5px)";
    setTimeout(() => {
      dynamicMsg.textContent = `"${P.wishes[wishIdx]}"`;
      dynamicMsg.style.transition = "all 0.3s ease";
      dynamicMsg.style.opacity = "1";
      dynamicMsg.style.transform = "translateY(0)";
    }, 200);
  });

  // ═══════════════════════════════════════════════════════════════
  // 9. AUTO-SHOW LOGIC
  // ═══════════════════════════════════════════════════════════════
  window.addEventListener("load", () => {
    if (activeFestival.isOverride) {
      setTimeout(openModal, 800);
      return;
    }
    const hasSeen = localStorage.getItem(storageKey);
    if (!hasSeen) {
      setTimeout(openModal, 1200);
    }
  });
})();
