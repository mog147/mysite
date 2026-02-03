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
        const originalTable = doc.querySelector('#news-area table');
        if (originalTable && newsArea) {
          newsArea.innerHTML = '';
          const newTable = document.createElement('table');
          newTable.className = originalTable.className;

          // 直近3つのみ抽出して追加
          const rows = Array.from(originalTable.querySelectorAll('tr')).slice(0, 3);
          rows.forEach(row => newTable.appendChild(row.cloneNode(true)));

          newsArea.appendChild(newTable);
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

  // 4. Global Lightbox (Premium Image Viewer)
  const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-close"><i class="fa fa-times"></i></div>
      <div class="lightbox-content">
        <img src="" alt="Gallery Image Large">
      </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      setTimeout(() => {
        lightbox.style.display = 'none';
      }, 400);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    return lightbox;
  };

  const lightbox = createLightbox();
  const lightboxImg = lightbox.querySelector('img');

  window.openLightbox = (src) => {
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
  };

  // Delegate click for gallery images
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && (e.target.closest('#gallery-grid') || e.target.closest('.gallery-grid'))) {
      window.openLightbox(e.target.src);
    }
  });

});
