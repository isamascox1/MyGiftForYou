/* ================================================
   BIRTHDAY LANDING PAGE — main.js
   Animaciones, interacciones y lógica de formulario
   ================================================ */

// ─── PETALS ─────────────────────────────────────────────────────────────────
(function initPetals() {
  const emojis = ['🌸', '🌺', '✿', '❀', '🌷', '💮', '🌹'];
  const container = document.getElementById('petals');
  if (!container) return;

  function spawnPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    const dur = 6 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }

  // Spawn initial batch
  for (let i = 0; i < 12; i++) {
    setTimeout(spawnPetal, i * 350);
  }
  setInterval(spawnPetal, 900);
})();


// ─── CANVAS PARTICLES ───────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#d4a5a5','#c9a96e','#f5e6e6','#f0dfc0','#b07878'];

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: 0.1 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  for (let i = 0; i < 80; i++) particles.push(createParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


// ─── STARS IN FINAL SECTION ─────────────────────────────────────────────────
(function initStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    s.style.left = Math.random() * 100 + '%';
    s.style.top  = Math.random() * 100 + '%';
    s.style.animationDuration = (2 + Math.random() * 4) + 's';
    s.style.animationDelay    = (Math.random() * 4) + 's';
    s.style.width = s.style.height = (1 + Math.random() * 2) + 'px';
    container.appendChild(s);
  }
})();


// ─── CANDLES ────────────────────────────────────────────────────────────────
(function initCandles() {
  const container = document.getElementById('candles');
  if (!container) return;
  let blownOut = 0;

  for (let i = 0; i < 28; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.innerHTML = `<div class="candle-flame"></div><div class="candle-body"></div>`;
    candle.addEventListener('click', () => {
      const flame = candle.querySelector('.candle-flame');
      if (flame) {
        flame.style.opacity = '0';
        flame.style.transform = 'scaleY(0)';
        flame.style.transition = 'all 0.3s ease';
        blownOut++;
        if (blownOut === 28) {
          setTimeout(() => showToast('🎂 ¡Felicidades! ¡Que todos tus deseos se cumplan! 💕'), 400);
        }
      }
    });
    container.appendChild(candle);
  }
})();


// ─── DESEOS GRID ────────────────────────────────────────────────────────────
(function initDeseos() {
  const grid = document.getElementById('deseos-grid');
  if (!grid) return;

  const deseos = [
    "Que cada mañana despiertes con paz en el corazón",
    "Que encuentres alegría en las cosas pequeñas",
    "Que tus sueños más profundos se vuelvan realidad",
    "Que tengas salud y energía para todo lo que amas",
    "Que el amor te rodee por donde quiera que vayas",
    "Que la fortuna llegue a ti de formas inesperadas",
    "Que nunca te falte la valentía de ser tú misma",
    "Que cada viaje que emprendas sea una aventura",
    "Que las personas que te rodean te valoren como mereces",
    "Que puedas descansar sin culpa ni preocupaciones",
    "Que tus lágrimas sean pocas y tus risas infinitas",
    "Que la creatividad fluya en todo lo que hagas",
    "Que tengas tiempo para lo que de verdad importa",
    "Que cada año te traiga una nueva versión más libre",
    "Que el universo conspire siempre a tu favor",
    "Que encuentres belleza en todo lo que te rodea",
    "Que tu corazón nunca pierda su capacidad de asombro",
    "Que seas tu mejor amiga en los momentos difíciles",
    "Que la música te acompañe en cada emoción",
    "Que tengas el valor de decir lo que sientes",
    "Que el miedo no te detenga ante ningún sueño",
    "Que cada libro que leas abra un nuevo mundo en ti",
    "Que tu cuerpo sea tu templo y lo cuides con amor",
    "Que nunca pierdas esa chispa única que te hace especial",
    "Que las despedidas difíciles siempre sean un nuevo comienzo",
    "Que tengas momentos de silencio que te recarguen el alma",
    "Que este año sea el más memorable de tu historia",
    "Que yo pueda ser parte de tus mejores momentos 💕"
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


// ─── SCROLL REVEAL ──────────────────────────────────────────────────────────
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.deseo-card, .trait-item, .promesa-item, .carta, .section-title, .section-desc, .label-tag'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => {
    t.classList.add('reveal');
    observer.observe(t);
  });
})();


// ─── EMOJI PICKER ───────────────────────────────────────────────────────────
(function initEmojiPicker() {
  const btns = document.querySelectorAll('.emoji-btn');
  const input = document.getElementById('sentimiento');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (input) input.value = btn.dataset.val;
    });
  });
})();


// ─── STAR RATING ────────────────────────────────────────────────────────────
(function initStarRating() {
  const stars = document.querySelectorAll('.stars-input .star');
  const input = document.getElementById('rating');

  stars.forEach((star, idx) => {
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
    star.addEventListener('click', () => {
      if (input) input.value = idx + 1;
      stars.forEach((s, i) => s.classList.toggle('active', i <= idx));
    });
  });

  const container = document.querySelector('.stars-input');
  if (container) {
    container.addEventListener('mouseleave', () => {
      const val = parseInt(input?.value || '0');
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
  }
})();


// ─── FORMULARIO ─────────────────────────────────────────────────────────────
(function initForm() {
  const form   = document.getElementById('mensajeForm');
  const list   = document.getElementById('inboxList');
  const empty  = list?.querySelector('.inbox-empty');

  if (!form) return;

  // Cargar mensajes guardados en localStorage
  let messages = [];
  try {
    messages = JSON.parse(localStorage.getItem('bdayMessages') || '[]');
  } catch (e) { messages = []; }

  function renderMessages() {
    if (!list) return;
    if (messages.length === 0) {
      list.innerHTML = '<p class="inbox-empty">Aún no hay mensajes... ¡sé el primero! ✨</p>';
      return;
    }
    list.innerHTML = messages.map(m => `
      <div class="inbox-card">
        <div class="ic-header">
          <span class="ic-name">${escHtml(m.name || 'Anónimo')}</span>
          <span class="ic-emoji">${m.emoji || ''}</span>
        </div>
        ${m.rating ? `<div class="ic-rating">${'★'.repeat(m.rating)}${'☆'.repeat(5 - m.rating)}</div>` : ''}
        <p class="ic-msg">${escHtml(m.text)}</p>
        <p class="ic-time">${m.time}</p>
      </div>
    `).join('');
  }

  renderMessages();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = document.getElementById('nombre')?.value.trim();
    const text  = document.getElementById('mensaje')?.value.trim();
    const emoji = document.getElementById('sentimiento')?.value;
    const rating = parseInt(document.getElementById('rating')?.value || '0');

    if (!text) {
      showToast('✏️ Escribe algo antes de enviar');
      return;
    }

    const msg = {
      name:  name || 'Anónimo',
      text,
      emoji,
      rating,
      time: new Date().toLocaleString('es-ES', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
    };

    messages.unshift(msg);
    try { localStorage.setItem('bdayMessages', JSON.stringify(messages.slice(0, 50))); } catch (e) {}

    renderMessages();
    form.reset();
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    document.getElementById('sentimiento').value = '';
    document.getElementById('rating').value = '0';

    showToast('💌 ¡Mensaje enviado con amor! Gracias ✨');
  });
})();


// ─── TOAST ──────────────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}


// ─── UTILS ──────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
