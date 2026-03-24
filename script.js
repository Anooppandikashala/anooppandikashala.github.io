document.getElementById('year').textContent = new Date().getFullYear();

const startDate = new Date('2018-07-09');
const expYears = ((new Date() - startDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);
document.getElementById('exp-years-text').textContent = Math.floor(expYears);

/* ── CURSOR ── */
const cur = document.getElementById('cur');
const glow = document.getElementById('cur-glow');
let mx = 0, my = 0, gx = 0, gy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function lerp() {
  gx += (mx - gx) * 0.07;
  gy += (my - gy) * 0.07;
  glow.style.left = gx + 'px';
  glow.style.top  = gy + 'px';
  requestAnimationFrame(lerp);
})();

document.querySelectorAll('a,button,.card,.stag,.stat,.edu-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '20px';
    cur.style.height = '20px';
    cur.style.opacity = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '8px';
    cur.style.height = '8px';
    cur.style.opacity = '1';
  });
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── REVEAL ON SCROLL ── */
const revEls = document.querySelectorAll('.rv');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });
revEls.forEach(el => revObs.observe(el));

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('[data-count]');
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let current = 0;
    const step = target / 32;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 45);
    cntObs.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => cntObs.observe(el));

// Animate experience years stat card
const expEl = document.getElementById('exp-years');
const expObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const target = parseFloat(expYears);
    let current = 0;
    const step = target / 32;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        expEl.textContent = expYears + '+';
        clearInterval(timer);
      } else {
        expEl.textContent = current.toFixed(1);
      }
    }, 45);
    expObs.unobserve(expEl);
  });
}, { threshold: 0.5 });
expObs.observe(expEl);

