// ===== CONFIG: Ganti link project & kontak di sini =====
const CONFIG = {
  email: "emeraldyrizky@gmail.com",
  github: "https://github.com/gengpelukgp-lab",
  projects: {
    bounce: "#",
    android: "#"
  }
};
const typedEl = document.getElementById('typedText');
const phrases = ["FUTURE DEVELOPER", "PPLG STUDENT", "WEB ENTHUSIAST", "ANDROID LEARNER"];
let pi = 0, ci = 0, deleting = false;
function typeLoop() {
  const cur = phrases[pi];
  if (!deleting) { typedEl.textContent = cur.slice(0, ci + 1); ci++; if (ci === cur.length) { deleting = true; setTimeout(typeLoop, 1400); return; } }
  else { typedEl.textContent = cur.slice(0, ci - 1); ci--; if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; } }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); navMenu.classList.toggle('open'); });
document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('open'); navMenu.classList.remove('open'); }));
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 20);
  backToTop.classList.toggle('show', scrollY > 600);
  let cur = "";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === "#" + cur); });
});
backToTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('emailLink').textContent = CONFIG.email;
document.getElementById('emailLink').href = "mailto:" + CONFIG.email;
document.getElementById('githubLink').textContent = CONFIG.github.replace('https://', '');
document.getElementById('githubLink').href = CONFIG.github;
document.querySelectorAll('.view-project-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const key = btn.dataset.project;
    const url = CONFIG.projects[key];
    if (!url || url === "#") {
      e.preventDefault();
      showProjectToast();
    } else { btn.href = url; }
  });
});
function showProjectToast() {
  const t = document.createElement('div');
  t.className = 'toast show';
  t.style.bottom = '80px';
  t.innerHTML = '<div class="toast-icon"><i class="fa-solid fa-link"></i></div><div><b>LINK BELUM DIATUR</b><span>Ganti CONFIG.projects di script.js dengan link project kamu.</span></div>';
  document.body.appendChild(t);
  setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(120px)'; setTimeout(() => t.remove(), 400) }, 2600);
}
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!name || !email || !msg) { alert('Lengkapi semua field terlebih dahulu.'); return; }
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3400);
});
toast.addEventListener('click', () => toast.classList.remove('show'));
const revealEls = document.querySelectorAll('.section-head, .about-text-card, .profile-wrap, .skill-card, .project-card, .tl-card, .contact-info, .contact-form');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); addEventListener('resize', resize);
for (let i = 0; i < 50; i++) particles.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 1.4 + 0.3, o: Math.random() * 0.5 + 0.2 });
(function anim() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,229,255,${p.o})`; ctx.fill();
  });
  for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
    const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.hypot(dx, dy);
    if (d < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
  }
  requestAnimationFrame(anim);
})();
