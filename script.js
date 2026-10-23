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
