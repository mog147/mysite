/**
 * 396 FOLIO - Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sophisticated Staggered Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    let delay = 0;
    const staggeredEntries = entries
      .filter(entry => entry.isIntersecting && !entry.target.classList.contains('active'))
      .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top ||
        a.target.getBoundingClientRect().left - b.target.getBoundingClientRect().left);

    staggeredEntries.forEach((entry) => {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, delay);
      delay += 100; // 0.1秒ずつの心地よいリズム
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // 2. Optimized News Fetching (Silent Error Handling)
  const newsArea = document.getElementById('top-info');
  if (newsArea) {
    fetch('news.html')
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const content = doc.querySelector('#news-area table');
        if (content) {
          newsArea.innerHTML = '';
          newsArea.appendChild(content);
        }
      })
      .catch(() => {
        newsArea.innerHTML = '<p style="text-align: center;">News data currently unavailable.</p>';
      });
  }


  // 3. Dynamic Header Shadow
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

});
