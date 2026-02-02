
// -------------------------------
// 396 FOLIO - Main Script
// Minimal & Performance Optimized
// -------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation & Dropdown
  // -------------------------
  const hasChildLinks = document.querySelectorAll(".has-child > a");
  const headC = document.querySelector('.headC');
  const headB = document.querySelector('.headB');

  const handleNavigation = () => {
    const width = window.innerWidth;

    // Reset behaviors (using delegate or simple check is better than off/on)
    if (width <= 768) {
      // Mobile: Hamburger Menu & Accordion is handled via static listeners below
    } else {
      // Desktop: Reset mobile-specific styles
      $(headB).css("display", "");
      $('.has-child').removeClass('active').children('ul').css("display", "");
    }
  };

  // Static event binding (Run once)
  $(hasChildLinks).on('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parentElem = $(this).parent();
      parentElem.toggleClass('active');
      parentElem.children('ul').stop().slideToggle(300);
    }
  });

  $(headC).on('click', function () {
    if (window.innerWidth <= 768) {
      $(headB).slideToggle(300);
    }
  });

  // Resize Listener with Debounce
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleNavigation, 200);
  }, { passive: true });

  handleNavigation();


  // 2. Header Scroll Effect (Glassmorphism integration)
  // ---------------------------------------------------
  const header = document.querySelector(".js-header");
  const headerTrigger = document.querySelector(".js-wrapper");

  if (header && headerTrigger) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerHeight = headerTrigger.offsetHeight;
          if (window.scrollY > triggerHeight - 30) {
            header.classList.add("headerColorScroll");
          } else {
            header.classList.remove("headerColorScroll");
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // 3. Scroll Animations (Intersection Observer)
  // --------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadein_animation_start');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.scroll_fadein, .fluffy');
  fadeElements.forEach(el => observer.observe(el));


  // 4. News Fetching (AJAX)
  // -----------------------
  const newsArea = document.getElementById('top-info');
  if (newsArea) {
    fetch('https://momoko0402.web.fc2.com/news.html')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newsContent = doc.querySelector('#news-area');

        if (newsContent) {
          const rows = newsContent.querySelectorAll('tr');
          $(newsArea).html(newsContent.innerHTML);
          $('#top-info th:gt(2),#top-info td:gt(2)').remove();
        }
      })
      .catch(err => console.error('Failed to fetch news:', err));
  }


  // 5. Contact Form Handling
  // ------------------------
  const form = document.querySelector('form');
  if (form) {
    const submitBtn = document.querySelector('.send');
    const requiredInputs = form.querySelectorAll('input[required]');

    if (submitBtn) submitBtn.disabled = true;

    requiredInputs.forEach(input => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.classList.add('required');
      }

      input.addEventListener('input', () => {
        let allFilled = [...requiredInputs].every(req => req.value.trim() !== '');
        if (submitBtn) submitBtn.disabled = !allFilled;
      });
    });

    window.postToGoogle = function () {
      const data = {};
      form.querySelectorAll('input[name^="entry."]').forEach(input => {
        data[input.name] = input.value;
      });

      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYEsQyqY1EzHRB7w8vg46BP_26vIJuk0lQjoJ_G1KD4qYslw/formResponse",
        data: data,
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: () => { window.location.href = "success.html"; },
          200: () => { window.location.href = "success.html"; }
        }
      });
    };
  }
});

