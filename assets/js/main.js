// assets/js/main.js
// WEB ATELIER (UDIT) — Session 5 behaviors

// ===== UTIL =====
function updatePageMetadata(title, description) {
  document.title = title;
  let m = document.querySelector('meta[name="description"]');
  if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
  m.content = description;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Session 5 init');

  // Persisted theme
  const body = document.body;
  const saved = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-bs-theme', saved);

  // Tooltip enable (Data API requires programmatic init)
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

  // Smooth in-page scroll (progressive enhancement)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Skip link focus
  const skip = document.querySelector('.skip-link');
  skip?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(skip.getAttribute('href'));
    target?.focus();
    target?.scrollIntoView({ behavior: 'smooth' });
  });

  // Navbar: collapse on link select (includes dropdown items)
  const collapseEl = document.getElementById('navbarNav');
  document.querySelectorAll('.navbar .nav-link[href^="#"], .dropdown-item[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (collapseEl && collapseEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // Active nav link highlight
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.navbar .nav-link')];
  const onScroll = () => {
    let current = '';
    for (const s of sections) if (scrollY >= s.offsetTop - 120) current = s.id;
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Dark mode toggle with icon update
  const toggle = document.getElementById('darkModeToggle');
  const setIcon = (theme) => {
    const i = toggle?.querySelector('i');
    if (!i) return;
    i.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  };
  setIcon(saved);
  toggle?.addEventListener('click', () => {
    const next = body.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-bs-theme', next);
    localStorage.setItem('theme', next);
    setIcon(next);
  });

  // Back to top
  const toTop = document.getElementById('backToTop');
  const showTop = () => { if (toTop) toTop.style.display = window.scrollY > 400 ? 'inline-flex' : 'none'; };
  window.addEventListener('scroll', showTop, { passive: true });
  showTop();
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Contact form: HTML5 validation + success modal (Data API)
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    bootstrap.Modal.getOrCreateInstance('#contactModal').show();
    form.reset();
    form.classList.remove('was-validated');
  });
});

// Resize + storage logs (optional debugging)
window.addEventListener('resize', () => console.log('Viewport:', innerWidth, 'x', innerHeight));
window.addEventListener('storage', (e) => { if (e.key === 'theme') console.log('Theme changed to:', e.newValue); });

// Export utility if needed elsewhere
window.updatePageMetadata = updatePageMetadata;
