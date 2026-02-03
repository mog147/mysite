/**
 * 396 FOLIO - Minimal Components
 */

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header id="main-header">
        <div class="container header-container">
          <a href="index.html" class="logo">396 FOLIO</a>
          <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
          </button>
          <nav class="main-nav">
            <ul class="nav-list">
              <li><a href="index.html">TOP</a></li>
              <li><a href="index.html#WORKS">WORKS</a></li>
              <li><a href="news.html">NEWS</a></li>
              <li><a href="about.html">ABOUT</a></li>
              <li class="nav-item">
                <a href="gallery.html">GALLERY</a>
                <ul class="dropdown">
                  <li><a href="gallery.html#watercolor">Watercolor</a></li>
                  <li><a href="gallery.html#pencil">Pencil Drawing</a></li>
                  <li><a href="gallery.html#digital">Digital Art</a></li>
                </ul>
              </li>
              <li><a href="contact.html">CONTACT</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
    this.initScrollEffect();
    this.initMobileMenu();
  }

  initScrollEffect() {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('main-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    }, { passive: true });
  }

  initMobileMenu() {
    const toggle = this.querySelector('.mobile-menu-toggle');
    const nav = this.querySelector('.main-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Close menu when a link is clicked
      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
    }
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="container footer-minimal">
          <div class="footer-content">
            <nav class="footer-sns">
              <a href="https://www.threads.net/@mogmog_atelier" target="_blank"><i class="fa-brands fa-threads"></i></a>
              <a href="https://www.instagram.com/mogmog_atelier/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://note.com/mog_0147/" target="_blank"><i class="fa-regular fa-note-sticky"></i></a>
            </nav>
            <div class="footer-copy">MOMOKO TEZUKA | 396 FOLIO</div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
