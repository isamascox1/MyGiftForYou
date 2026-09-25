/* ================================================
   PAULINA LISSET — paulina.js
   ================================================ */

// ── CANVAS PARTÍCULAS ──────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const cols = ['#5b8fd4','#2d5fa6','#c8ddf5','#9ab0cc','#dce8f5','#a8c4e8'];
  for (let i = 0; i < 90; i++) pts.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    r: 1 + Math.random() * 2.5,
    dx: (Math.random() - .5) * .35, dy: (Math.random() - .5) * .35,
    a: .1 + Math.random() * .45,
    col: cols[Math.floor(Math.random() * cols.length)]
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col; ctx.globalAlpha = p.a; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


// ── ESTRELLAS HERO ─────────────────────────────────────────────────────────
(function () {
  const cont = document.getElementById('starsHero');
  if (!cont) return;
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'star-h';
    const size = 1 + Math.random() * 3;
    s.style.cssText = `
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      width:${size}px;height:${size}px;
      animation-duration:${2+Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    cont.appendChild(s);
  }
})();


// ── BURBUJAS FLOTANTES ─────────────────────────────────────────────────────
(function () {
  const cont = document.getElementById('bubbles');
  if (!cont) return;

  function spawnBubble() {
    const el = document.createElement('div');
    el.className = 'bubble';
    const size = 20 + Math.random() * 60;
    el.style.cssText = `
      left:${Math.random()*100}vw;
      width:${size}px;height:${size}px;
      animation-duration:${8+Math.random()*10}s;
      animation-delay:${Math.random()*4}s;
    `;
    cont.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }

  for (let i = 0; i < 14; i++) setTimeout(spawnBubble, i * 600);
  setInterval(spawnBubble, 1400);
})();


// ── ESTRELLAS SECCIÓN FINAL ────────────────────────────────────────────────
(function () {
  const cont = document.getElementById('starsContainer');
  if (!cont) return;
  for (let i = 0; i < 140; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    const size = 1 + Math.random() * 2;
    s.style.cssText = `
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      width:${size}px;height:${size}px;
      animation-duration:${2+Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    cont.appendChild(s);
  }
})();


// ── 20 VELAS ───────────────────────────────────────────────────────────────
(function () {
  const cont = document.getElementById('candles');
  if (!cont) return;
  let blown = 0;

  for (let i = 0; i < 20; i++) {
    const c = document.createElement('div');
    c.className = 'candle';
    c.innerHTML = `<div class="candle-flame"></div><div class="candle-body"></div>`;
    c.addEventListener('click', () => {
      const fl = c.querySelector('.candle-flame');
      if (fl && fl.style.opacity !== '0') {
        fl.style.transition = 'all 0.3s ease';
        fl.style.opacity = '0';
        fl.style.transform = 'scaleY(0)';
        blown++;
        if (blown === 20) setTimeout(() => showToast('🎂 ¡Feliz cumpleaños Paulina! Que todos tus deseos se cumplan 💙'), 400);
      }
    });
    cont.appendChild(c);
  }
})();


// ── DESEOS GRID ────────────────────────────────────────────────────────────
(function () {
  const grid = document.getElementById('deseos-grid');
  if (!grid) return;

  const deseos = [
    "Que cada mañana despiertes con paz y con propósito",
    "Que el amor que das regrese a ti multiplicado",
    "Que nunca pierdas esa forma única de ver el mundo",
    "Que tus sueños no te den miedo, sino alas",
    "Que tengas salud para vivir todo lo que imaginas",
    "Que la gente que te rodea te merrezca de verdad",
    "Que cada viaje que hagas te deje algo nuevo dentro",
    "Que te permitas descansar sin sentir culpa",
    "Que la valentía siempre llegue justo cuando la necesitas",
    "Que encuentres belleza incluso en los días grises",
    "Que te rías tanto que te duela el estómago",
    "Que cada meta que te pongas tenga su recompensa",
    "Que sepas siempre cuánto vales, sin que nadie te lo diga",
    "Que tus veintes sean la época que siempre recordarás",
    "Que el universo conspire en tu favor, siempre",
    "Que te des cuenta de lo poderosa que ya eres hoy",
    "Que cada persona que pase por tu vida te deje algo bueno",
    "Que nunca te falte música para los momentos que lo piden",
    "Que este año sea el punto de partida de todo lo grande",
    "Que seas tan feliz que no quepas en ti misma 💙"
  ];

  deseos.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'deseo-card';
    card.style.setProperty('--d', (i * 0.05) + 's');
    card.innerHTML = `
      <span class="deseo-num">${String(i + 1).padStart(2, '0')}</span>
      <p class="deseo-text">${text}</p>
    `;
    grid.appendChild(card);
  });
})();


// ── SCROLL REVEAL ──────────────────────────────────────────────────────────
(function () {
  const targets = document.querySelectorAll(
    '.deseo-card, .trait-item, .carta, .acrostico-grupo, .section-title, .section-desc, .label-tag'
  );
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => { t.classList.add('reveal'); obs.observe(t); });
})();


// ── TOAST ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,#2d5fa6,#5b8fd4);color:#fff;
      padding:.8rem 2rem;border-radius:100px;font-family:'Lato',sans-serif;
      font-size:.9rem;z-index:9999;opacity:0;pointer-events:none;
      transition:opacity .4s,transform .4s;box-shadow:0 8px 24px rgba(0,0,0,.25);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3500);
}
