// Navbar scroll effect
const nav = document.querySelector('.nav');
const setNav = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 4);
setNav();
window.addEventListener('scroll', setNav, { passive: true });

// Hamburger Menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn && navLinks) {
  const navLinkItems = navLinks.querySelectorAll('a');

  // Toggle menu
  hamburgerBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    this.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  // Close menu when clicking on a link
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('show');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('show') &&
        !navLinks.contains(e.target) &&
        !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('show');
    }
  });
}

// Tabs functionality
document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = group.querySelectorAll('[role="tab"]');
  const panels = group.querySelectorAll('[role="tabpanel"]');

  function activate(idx) {
    tabs.forEach((t, i) => {
      const sel = i === idx;
      t.setAttribute('aria-selected', String(sel));
      t.classList.toggle('is-active', sel);
      t.tabIndex = sel ? 0 : -1;
    });
    panels.forEach((p, i) => {
      const active = i === idx;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => activate(i)));
  tabs.forEach((t, i) => t.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
  }));
});

// Back to top button
const toTop = document.getElementById('back-to-top');
if (toTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
}
