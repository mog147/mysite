/**
 * 396 FOLIO - Main Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sophisticated Staggered Reveal Animations (Mobile Optimized)
  const revealElements = document.querySelectorAll('.reveal');

  if (!window.IntersectionObserver) {
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px', // 少しマージンを持たせて早めに発火
      threshold: 0.01 // 1%でも入ったら発火させる（より確実に）
    });

    window.revealObserver = revealObserver; // グローバルに公開
    revealElements.forEach(el => {
      revealObserver.observe(el);
      // 既に画面内にある場合は即座に表示（保険）
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
        revealObserver.unobserve(el);
      }
    });
  }
  // 2. Interactive Hero Parallax & Aura
  const hero = document.querySelector('.hero');
  const aura = document.querySelector('.hero-aura');
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg img');

  if (hero && aura) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Move aura
      aura.style.left = `${x}px`;
      aura.style.top = `${y}px`;

      // Subtle parallax for background only (Text remains static)
      const moveX = (x - rect.width / 2) / 40;
      const moveY = (y - rect.height / 2) / 40;

      if (heroBg) {
        heroBg.style.transform = `scale(1.1) translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
      }
    });

    // Reset position on mouse leave
    hero.addEventListener('mouseleave', () => {
      if (heroBg) heroBg.style.transform = `scale(1) translate(0, 0)`;
    });
  }



  // 2. Optimized News Fetching (Silent Error Handling)
  const newsArea = document.getElementById('top-info');
  if (newsArea) {
    fetch('news.html')
      .then(res => res.ok ? res.text() : Promise.reject())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const infoTable = doc.querySelector('#news-data');

        if (infoTable && newsArea) {
          const data = JSON.parse(infoTable.getAttribute('data'));
          const top3 = data.slice(0, 3);

          if (top3.length > 0) {
            top3[0].isNew = true;
          }

          newsArea.innerHTML = `
            <info-table data='${JSON.stringify(top3).replace(/'/g, "&apos;")}'></info-table>
          `;
        }
      })
      .catch((err) => {
        console.error('News fetch error:', err);
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
