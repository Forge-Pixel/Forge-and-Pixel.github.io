/* ============================================
   FORGE & PIXEL — main.js
   Interactions, animations, and scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Navigation ───
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ─── Navbar scroll effect ───
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ─── Scroll Reveal Animations ───
  const revealElements = document.querySelectorAll('.reveal, .stagger');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ─── Skill Bars Animation ───
  const skillFills = document.querySelectorAll('.skill__fill');

  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill__fill');
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = fill.dataset.width + '%';
            }, i * 150);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
      skillObserver.observe(skillsContainer);
    }
  }

  // ─── Counter Animation ───
  const counters = document.querySelectorAll('.stat__number[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.textContent.replace(/[0-9]/g, '');
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current >= target) {
              current = target;
              el.textContent = target + suffix;
              return;
            }
            el.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          };

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ─── Form success feedback (AJAX for Netlify) ───
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = new URLSearchParams(formData).toString();

      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data
      })
        .then(() => {
          contactForm.innerHTML = `
          <div style="text-align: center; padding: var(--space-xl) 0;" class="reveal reveal--scale visible">
            <div style="margin-bottom: var(--space-sm);"><img src="assets/images/fusee.svg" class="neon-icon" alt="Envoyé !" width="64" height="64"></div>
            <h3 style="font-family: var(--ff-heading); font-size: 1.4rem; margin-bottom: var(--space-xs);">Message envoyé !</h3>
            <p style="color: var(--clr-text-muted);">Merci ! Je vous répondrai sous 24h.</p>
          </div>
        `;
        })
        .catch((error) => {
          alert("Erreur lors de l'envoi. Merci de me contacter sur Discord ou par email.");
          console.error(error);
        });
    });
  }

  // ─── Smooth anchor scrolling (for same-page links) ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
