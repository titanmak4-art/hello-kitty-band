const navLinks = [...document.querySelectorAll('.side-nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  }, { rootMargin: '-35% 0px -50% 0px', threshold: [0.05, 0.25, 0.5] });

  sections.forEach((section) => sectionObserver.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveSection(link.getAttribute('href').slice(1)));
});

let navTimer;
window.addEventListener('mousemove', (event) => {
  const nearLeftEdge = event.clientX <= 190;
  const overNav = event.target.closest('.side-nav');
  document.body.classList.toggle('nav-visible', nearLeftEdge || Boolean(overNav));
  clearTimeout(navTimer);
  if (!nearLeftEdge && !overNav) {
    navTimer = window.setTimeout(() => document.body.classList.remove('nav-visible'), 250);
  }
});
