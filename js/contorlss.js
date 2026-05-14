/* ═══════════════════════════════════════
   HERO MOUSE FOLLOW GLOW
═══════════════════════════════════════ */
const hero = document.getElementById('land');
const glow = document.getElementById('hero-glow');

hero.addEventListener('mousemove', e => {
  const rect = hero.getBoundingClientRect();
  glow.style.left = (e.clientX - rect.left) + 'px';
  glow.style.top = (e.clientY - rect.top) + 'px';
});

/* ═══════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = [
  'rgba(189,224,254,0.7)',
  'rgba(255,200,221,0.6)',
  'rgba(205,180,219,0.6)',
  'rgba(108,155,207,0.5)'
];

const particles = Array.from({ length: 45 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 3 + 1,
  vx: (Math.random() - 0.5) * 0.4,
  vy: (Math.random() - 0.5) * 0.4,
  color: colors[Math.floor(Math.random() * colors.length)],
  life: Math.random() * Math.PI * 2
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.life += 0.015;
    p.x += p.vx;
    p.y += p.vy + Math.sin(p.life) * 0.2;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * (0.8 + Math.sin(p.life) * 0.2), 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ═══════════════════════════════════════
   NAVBAR SCROLL BEHAVIOR
═══════════════════════════════════════ */
const header = document.getElementById('main-header');
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('nav ul li:not(:first-child) a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ═══════════════════════════════════════
   SCROLL REVEAL — INTERSECTION OBSERVER
═══════════════════════════════════════ */
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, #about > p:last-child, .edu, .proj, #contact h2, #contact ul li'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.12) + 's';
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

document.querySelectorAll('.proj').forEach((p, i) => {
  p.style.transitionDelay = (i * 0.1) + 's';
});

document.querySelectorAll('#contact ul li').forEach((li, i) => {
  li.style.transitionDelay = (i * 0.08 + 0.15) + 's';
});