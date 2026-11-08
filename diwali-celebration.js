/**
 * THE E CHRONICLES — Interactive Diwali & Tihar Celebration Modal
 * Drop-in script: Add `<script src="diwali-celebration.js"></script>` to index.html or shared.js
 * Zero dependencies, pure vanilla JS + canvas particles + Web Audio API.
 */
(function () {
  if (window.__DIWALI_POPUP_INITIALIZED__) return;
  window.__DIWALI_POPUP_INITIALIZED__ = true;

  // --- Configuration ---
  const CONFIG = {
    title: "शुभ दीपावली & तिहार",
    subtitle: "Festival of Lights • Section E Family",
    batchText: "St. Xavier's College • Batch of 2027",
    mainGreeting: "May the divine glow of Deepawali illuminate our classroom memories, late-night study sessions, and every grand dream we chase!",
    wishes: [
      "✨ May your hard work turn into top ranks and your dreams into stethoscopes & blueprints!",
      "🪔 May the bonds of Section E shine brighter than a thousand golden lamps.",
      "🎆 Health, laughter, boundless peace, and unforgettable moments for you and your family.",
      "🌺 From biology lab records to lifelong friendships, Happy Tihar & Diwali!",
      "💫 Wherever life takes us after SXC, may our Section E spark never fade."
    ],
    autoShowDelay: 1200, // ms after page load
    storageKey: "ec_diwali_seen_v1"
  };

  // --- Web Audio Synth for Interactive Sound Effects ---
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

  function playChime(freq = 587.33, type = "sine", duration = 1.2) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      /* ignore audio errors */
    }
  }

  function playSparkleSound() {
    if (!soundEnabled || !audioCtx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playChime(freq, "triangle", 0.6), idx * 80);
    });
  }

  function playCelebrationFanfare() {
    if (!soundEnabled || !audioCtx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chords.forEach((f, i) => {
      setTimeout(() => playChime(f, "sine", 1.8), i * 110);
    });
  }

  // --- Inject CSS ---
  const styleEl = document.createElement("style");
  styleEl.id = "diwali-celebration-styles";
  styleEl.textContent = `
    /* Diwali Modal Variables & Reset */
    .diwali-backdrop {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: radial-gradient(circle at center, rgba(30, 8, 55, 0.88) 0%, rgba(10, 3, 20, 0.96) 100%);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease;
      box-sizing: border-box;
      font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
    }
    .diwali-backdrop.active {
      opacity: 1;
      visibility: visible;
    }

    .diwali-canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .diwali-card {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 580px;
      max-height: 90vh;
      overflow-y: auto;
      background: linear-gradient(145deg, rgba(38, 16, 70, 0.85), rgba(18, 7, 34, 0.95));
      border: 1.5px solid rgba(255, 215, 107, 0.35);
      border-radius: 28px;
      padding: 2.2rem 2rem 2rem;
      color: #fbf7ff;
      text-align: center;
      box-shadow: 0 25px 80px -15px rgba(255, 180, 0, 0.3), 0 0 60px rgba(139, 92, 246, 0.25);
      transform: scale(0.92) translateY(20px);
      transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .diwali-backdrop.active .diwali-card {
      transform: scale(1) translateY(0);
    }

    /* Decorative Rangoli Pattern Borders */
    .diwali-rangoli-corner {
      position: absolute;
      width: 70px;
      height: 70px;
      opacity: 0.45;
      pointer-events: none;
      color: #ffd76b;
    }
    .diwali-top-left { top: 12px; left: 12px; }
    .diwali-top-right { top: 12px; right: 12px; transform: rotate(90deg); }

    .diwali-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(255, 215, 107, 0.12);
      border: 1px solid rgba(255, 215, 107, 0.4);
      color: #ffd76b;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      box-shadow: 0 0 15px rgba(255, 215, 107, 0.2);
    }

    .diwali-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(1.8rem, 4.5vw, 2.5rem);
      font-weight: 900;
      margin: 0 0 0.3rem;
      background: linear-gradient(135deg, #fff7d6 0%, #ffd76b 40%, #ff8c42 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
      text-shadow: 0 0 35px rgba(255, 180, 0, 0.35);
    }

    .diwali-subtitle {
      font-size: 0.95rem;
      color: #d1b8ff;
      margin: 0 0 1.2rem;
      font-weight: 500;
      letter-spacing: 0.02em;
    }

    .diwali-message {
      font-size: 0.98rem;
      line-height: 1.6;
      color: #ede4fc;
      margin: 0 auto 1.4rem;
      max-width: 480px;
      background: rgba(255, 255, 255, 0.04);
      padding: 0.9rem 1.2rem;
      border-radius: 16px;
      border: 1px solid rgba(196, 167, 255, 0.15);
      font-style: italic;
    }

    /* Interactive Diyas Area */
    .diwali-diyas-wrap {
      background: rgba(15, 5, 28, 0.6);
      border: 1px dashed rgba(255, 215, 107, 0.3);
      border-radius: 20px;
      padding: 1.1rem 0.8rem 0.9rem;
      margin-bottom: 1.3rem;
      position: relative;
    }

    .diwali-diyas-header {
      font-size: 0.82rem;
      font-weight: 600;
      color: #f7d58b;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .diwali-diyas-row {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: clamp(8px, 2.5vw, 18px);
      padding: 0.2rem 0;
    }

    .diya-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      padding: 4px;
    }
    .diya-item:hover {
      transform: translateY(-4px) scale(1.05);
    }
    .diya-item:active {
      transform: scale(0.95);
    }

    .diya-flame {
      width: 14px;
      height: 24px;
      background: radial-gradient(ellipse at bottom, #ffffff 10%, #ffe600 45%, #ff5d00 80%, transparent 100%);
      border-radius: 50% 50% 35% 35% / 70% 70% 30% 30%;
      margin-bottom: -4px;
      opacity: 0.15;
      transform: scale(0.4);
      filter: blur(0.5px);
      transition: all 0.4s ease;
      position: relative;
    }

    .diya-item.lit .diya-flame {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 -8px 25px rgba(255, 150, 0, 0.9), 0 -12px 40px rgba(255, 80, 0, 0.6);
      animation: flameFlicker 1.8s infinite ease-in-out alternate;
    }

    @keyframes flameFlicker {
      0% { transform: scale(1) rotate(-1.5deg); }
      50% { transform: scale(1.08, 0.96) rotate(1.5deg); }
      100% { transform: scale(0.95, 1.05) rotate(-0.5deg); }
    }

    .diya-base {
      width: 44px;
      height: 22px;
      background: linear-gradient(180deg, #d9822b 0%, #8c4109 100%);
      border-radius: 2px 2px 24px 24px;
      border-top: 2px solid #ffd27d;
      box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 4px 10px rgba(0, 0, 0, 0.4);
      position: relative;
      display: flex;
      justify-content: center;
    }
    .diya-base::after {
      content: '';
      position: absolute;
      top: -3px;
      width: 6px;
      height: 4px;
      background: #4a2105;
      border-radius: 2px;
    }
    .diya-item.lit .diya-base {
      background: linear-gradient(180deg, #ff9f43 0%, #b85207 100%);
      border-top-color: #fff1c7;
      box-shadow: 0 0 15px rgba(255, 170, 0, 0.4);
    }

    .diya-label {
      font-size: 0.72rem;
      color: #9d8db8;
      margin-top: 6px;
      font-weight: 500;
      transition: color 0.3s;
    }
    .diya-item.lit .diya-label {
      color: #ffd76b;
      font-weight: 700;
    }

    /* Actions & Interactions */
    .diwali-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-top: 1rem;
    }

    .diwali-btn {
      appearance: none;
      border: none;
      outline: none;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 0.7rem 1.4rem;
      border-radius: 999px;
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .diwali-btn-primary {
      background: linear-gradient(135deg, #ffd76b 0%, #ff8c42 100%);
      color: #2b1100;
      box-shadow: 0 4px 20px rgba(255, 140, 66, 0.4);
    }
    .diwali-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255, 140, 66, 0.6);
      filter: brightness(1.08);
    }

    .diwali-btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: #f1e9ff;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .diwali-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 215, 107, 0.4);
      transform: translateY(-2px);
    }

    /* Controls: Close & Sound */
    .diwali-close-btn, .diwali-sound-btn {
      position: absolute;
      top: 16px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.06);
      color: #e5d7ff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: all 0.2s;
      z-index: 10;
    }
    .diwali-close-btn { right: 16px; }
    .diwali-sound-btn { left: 16px; }
    .diwali-close-btn:hover, .diwali-sound-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
      transform: scale(1.08);
    }

    /* Floating Re-open Button */
    .diwali-floating-pill {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      background: linear-gradient(135deg, #1f083d, #3c126d);
      border: 1.5px solid rgba(255, 215, 107, 0.5);
      color: #ffd76b;
      padding: 10px 18px;
      border-radius: 999px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.86rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 107, 0.3);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .diwali-floating-pill:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 107, 0.5);
    }
    .diwali-floating-pill .pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff5d00;
      box-shadow: 0 0 10px #ffea00;
      animation: diwaliPulse 1.4s infinite;
    }
    @keyframes diwaliPulse {
      0% { transform: scale(0.9); opacity: 0.7; }
      50% { transform: scale(1.3); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.7; }
    }

    @media (max-width: 480px) {
      .diwali-card {
        padding: 2rem 1.2rem 1.6rem;
        border-radius: 22px;
      }
      .diya-base { width: 36px; height: 18px; }
      .diwali-actions { flex-direction: column; }
      .diwali-btn { width: 100%; justify-content: center; }
      .diwali-floating-pill { bottom: 16px; right: 16px; padding: 8px 14px; font-size: 0.8rem; }
    }
  `;
  document.head.appendChild(styleEl);

  // --- Modal HTML Structure ---
  const modalHTML = `
    <div class="diwali-backdrop" id="diwaliBackdrop" role="dialog" aria-modal="true" aria-label="Diwali Celebration">
      <canvas class="diwali-canvas" id="diwaliCanvas"></canvas>
      
      <div class="diwali-card" id="diwaliCard">
        <!-- Rangoli Corner SVGs -->
        <svg class="diwali-rangoli-corner diwali-top-left" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0 Z" fill="currentColor" fill-opacity="0.1"/>
          <circle cx="50" cy="50" r="4" fill="currentColor"/>
        </svg>
        <svg class="diwali-rangoli-corner diwali-top-right" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>
          <path d="M0,0 Q50,0 50,50 Q0,50 0,0 Z" fill="currentColor" fill-opacity="0.1"/>
          <circle cx="50" cy="50" r="4" fill="currentColor"/>
        </svg>

        <button class="diwali-sound-btn" id="diwaliSoundToggle" title="Toggle sound effects" aria-label="Toggle sound">🔔</button>
        <button class="diwali-close-btn" id="diwaliCloseBtn" title="Close" aria-label="Close modal">✕</button>

        <div class="diwali-badge">✨ St. Xavier's College • Section E ✨</div>
        <h2 class="diwali-title">${CONFIG.title}</h2>
        <div class="diwali-subtitle">${CONFIG.subtitle}</div>

        <p class="diwali-message" id="diwaliDynamicMsg">
          "${CONFIG.mainGreeting}"
        </p>

        <!-- Interactive Diyas Container -->
        <div class="diwali-diyas-wrap">
          <div class="diwali-diyas-header">
            <span>🪔</span>
            <span id="diwaliProgressText">Tap each Diya to light the lamps (0/5)</span>
          </div>
          <div class="diwali-diyas-row" id="diwaliDiyasContainer">
            <div class="diya-item" data-index="1" title="Light Diya 1">
              <div class="diya-flame"></div>
              <div class="diya-base"></div>
              <div class="diya-label">Wisdom</div>
            </div>
            <div class="diya-item" data-index="2" title="Light Diya 2">
              <div class="diya-flame"></div>
              <div class="diya-base"></div>
              <div class="diya-label">Bond</div>
            </div>
            <div class="diya-item" data-index="3" title="Light Diya 3">
              <div class="diya-flame"></div>
              <div class="diya-base"></div>
              <div class="diya-label">Dreams</div>
            </div>
            <div class="diya-item" data-index="4" title="Light Diya 4">
              <div class="diya-flame"></div>
              <div class="diya-base"></div>
              <div class="diya-label">Health</div>
            </div>
            <div class="diya-item" data-index="5" title="Light Diya 5">
              <div class="diya-flame"></div>
              <div class="diya-base"></div>
              <div class="diya-label">Success</div>
            </div>
          </div>
        </div>

        <div class="diwali-actions">
          <button class="diwali-btn diwali-btn-primary" id="diwaliCelebrateBtn">
            <span>🎆 Burst Fireworks</span>
          </button>
          <button class="diwali-btn diwali-btn-secondary" id="diwaliWishBtn">
            <span>💌 Next Class Wish</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Re-open Badge -->
    <button class="diwali-floating-pill" id="diwaliFloatingPill" title="Open Diwali Special">
      <span class="pulse-dot"></span>
      <span>🪔 Happy Diwali!</span>
    </button>
  `;

  const container = document.createElement("div");
  container.innerHTML = modalHTML;
  document.body.appendChild(container);

  // --- Element Selectors ---
  const backdrop = document.getElementById("diwaliBackdrop");
  const card = document.getElementById("diwaliCard");
  const closeBtn = document.getElementById("diwaliCloseBtn");
  const soundBtn = document.getElementById("diwaliSoundToggle");
  const floatingPill = document.getElementById("diwaliFloatingPill");
  const celebrateBtn = document.getElementById("diwaliCelebrateBtn");
  const wishBtn = document.getElementById("diwaliWishBtn");
  const dynamicMsg = document.getElementById("diwaliDynamicMsg");
  const progressText = document.getElementById("diwaliProgressText");
  const diyaItems = document.querySelectorAll(".diya-item");
  const canvas = document.getElementById("diwaliCanvas");
  const ctx = canvas.getContext("2d");

  // --- Canvas Particle Engine (Fireworks, Sparklers, Flowers) ---
  let particles = [];
  let animId = null;
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor(x, y, color, isSparkle = false) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.isSparkle = isSparkle;
      const angle = Math.random() * Math.PI * 2;
      const speed = isSparkle ? Math.random() * 3 + 1 : Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.radius = isSparkle ? Math.random() * 2 + 1 : Math.random() * 3 + 2;
      this.gravity = isSparkle ? 0.08 : 0.12;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.98;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createFirework(x, y) {
    const colors = ["#ffd76b", "#ff8c42", "#ff3d71", "#a855f7", "#38ef7d", "#ffffff"];
    const count = 55;
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, color));
    }
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

  function triggerBurst(x = W / 2, y = H * 0.4) {
    createFirework(x, y);
    if (!animId) loopCanvas();
  }

  // --- Modal Visibility Logic ---
  function openModal() {
    initAudio();
    backdrop.classList.add("active");
    triggerBurst(W / 2, H * 0.35);
    playSparkleSound();
  }

  function closeModal() {
    backdrop.classList.remove("active");
    sessionStorage.setItem(CONFIG.storageKey, "1");
  }

  // Close when clicking backdrop outside card
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);
  floatingPill.addEventListener("click", openModal);

  // Sound Toggle
  soundBtn.addEventListener("click", () => {
    initAudio();
    soundEnabled = !soundEnabled;
    soundBtn.textContent = soundEnabled ? "🔔" : "🔕";
    soundBtn.title = soundEnabled ? "Sound Effects: ON" : "Sound Effects: OFF";
  });

  // --- Diya Lighting Interaction ---
  let litDiyasCount = 0;
  diyaItems.forEach((diya) => {
    diya.addEventListener("click", (e) => {
      initAudio();
      const rect = diya.getBoundingClientRect();
      const clickX = rect.left + rect.width / 2;
      const clickY = rect.top;

      if (!diya.classList.contains("lit")) {
        diya.classList.add("lit");
        litDiyasCount++;
        playChime(350 + litDiyasCount * 90, "sine", 1.0);

        // Burst golden sparks at the diya flame position
        for (let i = 0; i < 20; i++) {
          particles.push(new Particle(clickX, clickY, "#ffd76b", true));
        }
        if (!animId) loopCanvas();

        if (litDiyasCount === diyaItems.length) {
          progressText.innerHTML = "✨ All 5 Lamps Lit! Section E is Illuminated! ✨";
          progressText.style.color = "#ffd76b";
          playCelebrationFanfare();
          // Grand celebration bursts
          setTimeout(() => triggerBurst(W * 0.3, H * 0.35), 100);
          setTimeout(() => triggerBurst(W * 0.7, H * 0.35), 350);
          setTimeout(() => triggerBurst(W * 0.5, H * 0.25), 600);
        } else {
          progressText.textContent = `Lamps Lit: ${litDiyasCount} / ${diyaItems.length}`;
        }
      } else {
        // Already lit — produce gentle sparkler flickers
        playChime(700, "triangle", 0.4);
        for (let i = 0; i < 12; i++) {
          particles.push(new Particle(clickX, clickY, "#ff9f43", true));
        }
        if (!animId) loopCanvas();
      }
    });
  });

  // --- Fireworks & Wishes Buttons ---
  celebrateBtn.addEventListener("click", () => {
    initAudio();
    playCelebrationFanfare();
    // Light all diyas if not lit
    diyaItems.forEach((d) => d.classList.add("lit"));
    litDiyasCount = diyaItems.length;
    progressText.innerHTML = "✨ All 5 Lamps Lit! Section E is Illuminated! ✨";
    progressText.style.color = "#ffd76b";

    // Random festive bursts across the screen
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        triggerBurst(W * (0.2 + Math.random() * 0.6), H * (0.2 + Math.random() * 0.4));
      }, i * 220);
    }
  });

  let wishIndex = 0;
  wishBtn.addEventListener("click", () => {
    initAudio();
    playChime(880, "sine", 0.8);
    wishIndex = (wishIndex + 1) % CONFIG.wishes.length;
    dynamicMsg.style.opacity = "0";
    dynamicMsg.style.transform = "translateY(5px)";
    setTimeout(() => {
      dynamicMsg.textContent = `"${CONFIG.wishes[wishIndex]}"`;
      dynamicMsg.style.transition = "all 0.3s ease";
      dynamicMsg.style.opacity = "1";
      dynamicMsg.style.transform = "translateY(0)";
    }, 200);
  });

  // --- Auto-trigger on page load ---
  window.addEventListener("load", () => {
    const hasSeen = sessionStorage.getItem(CONFIG.storageKey);
    if (!hasSeen) {
      setTimeout(openModal, CONFIG.autoShowDelay);
    }
  });
})();
