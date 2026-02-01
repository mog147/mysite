
// -------------------------------
// 396 FOLIO - Main Script
// Minimal & Performance Optimized
// -------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation & Dropdown
  // -------------------------
  const initNavigation = () => {
    const width = window.innerWidth;
    const hasChildLinks = document.querySelectorAll(".has-child > a");
    const headC = document.querySelector('.headC');
    const headB = document.querySelector('.headB');

    // Reset behaviors
    $(hasChildLinks).off('click');
    $('.headC').off('click');

    if (width <= 768) {
      // Mobile: Accordion Dropdown
      $(hasChildLinks).on('click', function (e) {
        e.preventDefault();
        const parentElem = $(this).parent();
        $(parentElem).toggleClass('active');
        $(parentElem).children('ul').stop().slideToggle(300);
      });

      // Mobile: Hamburger Menu
      $(headC).on('click', function () {
        $(headB).slideToggle(300);
      });

    } else {
      // Desktop: Hover is handled by CSS
      $(".has-child").removeClass('active');
      $('.has-child').children('ul').css("display", "");
      $(headB).show();
    }
  };

  // Initialize & Resize Listener
  initNavigation();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initNavigation, 200);
  });


  // 2. Header Scroll Effect (Glassmorphism integration)
  // ---------------------------------------------------
  const header = document.querySelector(".js-header");
  const headerTrigger = document.querySelector(".js-wrapper");

  if (header && headerTrigger) {
    window.addEventListener("scroll", () => {
      const triggerHeight = headerTrigger.offsetHeight;
      if (window.scrollY > triggerHeight - 30) {
        header.classList.add("headerColorScroll");
      } else {
        header.classList.remove("headerColorScroll");
      }
    }, { passive: true });
  }


  // 3. Scroll Animations (Intersection Observer)
  // --------------------------------------------
  // Replaces old jQuery scroll events for better performance
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadein_animation_start');
        observer.unobserve(entry.target); // Run once
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
          // Filter to show only the first 3 items (Title + Date + Content)
          const rows = newsContent.querySelectorAll('tr');
          // Simple hygiene: limit rows if needed, currently just dumping content
          // Adjust this selector based on actual external HTML structure if needed
          $(newsArea).html(newsContent.innerHTML);

          // Limit to 1 item (3 elements: th(date), td(cat), td(title) or similar?)
          // Original code used: $('#top-info th:gt(2),#top-info td:gt(2)').remove();
          // We replicate that logic safely with jQuery since html() was used
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

    // Disable initially
    if (submitBtn) submitBtn.disabled = true;

    // Add 'required' marker class to labels
    requiredInputs.forEach(input => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.classList.add('required');
      }

      // Validation Listener
      input.addEventListener('input', () => {
        let allFilled = true;
        requiredInputs.forEach(req => {
          if (!req.value.trim()) allFilled = false;
        });
        if (submitBtn) submitBtn.disabled = !allFilled;
      });
    });

    // Global function for Google Form submission iframe/script
    window.postToGoogle = function () {
      const field1 = $('[name="entry.1564263618"]').val();
      const field2 = $('[name="entry.292870337"]').val();
      const field3 = $('[name="entry.1735355409"]').val();
      const field4 = $('[name="entry.1370003883"]').val();

      $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYEsQyqY1EzHRB7w8vg46BP_26vIJuk0lQjoJ_G1KD4qYslw/formResponse",
        data: {
          "entry.1564263618": field1,
          "entry.292870337": field2,
          "entry.1735355409": field3,
          "entry.1370003883": field4,
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () { window.location.href = "success.html"; },
          200: function () { window.location.href = "success.html"; }
        }
      });
    };
  }
});

