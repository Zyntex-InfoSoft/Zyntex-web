// ======================================
// GSAP Setup
// ======================================
gsap.registerPlugin(ScrollTrigger);

// ======================================
// Initialize on DOM Load
// ======================================
document.addEventListener('DOMContentLoaded', function() {
  
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize all features
  initHeaderScroll();
  initSmoothScrolling();
  initGSAPAnimations();
  initVideoBackground();
  initFormHandler();
  initNumberCounters();
  initStatusBars();
  // initMobileMenu();
});

// ======================================
// Header Scroll Effect
// ======================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ======================================
// Smooth Scrolling for Navigation Links
// ======================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        // Close mobile menu if open
        document.querySelector('.nav-toggle-btn')?.classList.remove('open');
        document.querySelector('.nav-links')?.classList.remove('open');

        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ======================================
// GSAP Animations
// ======================================
function initGSAPAnimations() {
  
  // Hero Section Animations
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-actions', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
  });

  gsap.from('.hero-stat', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.8,
    ease: 'power3.out'
  });

  // Animate particles with GSAP
  gsap.to('.particle', {
    y: -100,
    duration: 20,
    ease: 'none',
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 2,
      from: 'random'
    }
  });

  // Section Headers Animation
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Service Cards Animation
  gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });

  // Generic Cards Animation
  gsap.utils.toArray('.card:not(.service-card)').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out'
    });
  });

  // Small Cards Animation
  gsap.utils.toArray('.small-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });

  // Feature List Items Animation
  gsap.utils.toArray('.feature-list li').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });

  // Status Items Animation
  gsap.utils.toArray('.status-item').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: -40,
      duration: 0.7,
      delay: index * 0.15,
      ease: 'power2.out'
    });
  });

  // Form Animation
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Value List Animation
  gsap.utils.toArray('.value-list li').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: 30,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out'
    });
  });

  // Parallax effect on hero section
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    opacity: 0.5,
    ease: 'none'
  });

  // Footer Animation
  gsap.from('.site-footer', {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 95%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
  });
}

// ======================================
// Video Background Control
// ======================================
function initVideoBackground() {
  const video = document.getElementById('bg-video');
  const contactSection = document.getElementById('contact');

  if (!video || !contactSection) return;

  // Fade video on contact section
  window.addEventListener('scroll', () => {
    const contactTop = contactSection.offsetTop;
    const contactHeight = contactSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    if (scrollPosition >= contactTop && scrollPosition <= contactTop + contactHeight) {
      gsap.to(video, {
        opacity: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(video, {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });

  // Pause video when not visible (performance optimization)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(video);
}

// ======================================
// Number Counter Animation
// ======================================
function initNumberCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-count'));
    
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: 'power1.out',
          snap: { innerText: 0.1 },
          onUpdate: function() {
            const value = parseFloat(this.targets()[0].innerText);
            counter.innerText = value.toFixed(1);
          }
        });
      },
      once: true
    });
  });
}

// ======================================
// Status Bar Animation
// ======================================
function initStatusBars() {
  const statusFills = document.querySelectorAll('.status-fill');
  
  statusFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(fill, {
          width: width + '%',
          duration: 1.5,
          ease: 'power2.out'
        });
      },
      once: true
    });
  });
}

// ======================================
// Mobile Menu Control
// ======================================
// function initMobileMenu() {
//   const navToggle = document.getElementById('nav-toggle');
//   const navLinks = document.querySelectorAll('.nav-link');
  
//   // Close menu when clicking outside
//   document.addEventListener('click', (e) => {
//     const nav = document.querySelector('.nav-links');
//     const toggle = document.querySelector('.nav-toggle-label');
    
//     if (navToggle.checked && !nav.contains(e.target) && !toggle.contains(e.target)) {
//       navToggle.checked = false;
//     }
//   });

//   // Close menu when clicking a link
//   navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//       navToggle.checked = false;
//     });
//   });
// }

// ======================================
// Form Handler
// ======================================
function initFormHandler() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      company: document.getElementById('company').value,
      message: document.getElementById('message').value
    };

    // Animate submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    gsap.to(submitBtn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          submitBtn.textContent = '✓ Sent Successfully!';
          submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
          
          // Reset form
          form.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 3000);
        }, 1500);
      }
    });

    console.log('Form submitted:', formData);
  });

  // Add focus animations to form fields
  const formInputs = form.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      gsap.to(this, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ======================================
// Cursor Effect (Optional Enhancement)
// ======================================
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// Uncomment to enable cursor effect
// initCursorEffect();

// ======================================
// Scroll Progress Indicator
// ======================================
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    gsap.to(progressBar, {
      width: scrolled + '%',
      duration: 0.1,
      ease: 'none'
    });
  });
}

// Uncomment to enable scroll progress
// initScrollProgress();

// ======================================
// Performance Optimization
// ======================================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Debounce scroll events for better performance
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
const toggleBtn = document.querySelector('.nav-toggle-btn');
  const navLinks = document.querySelector('.nav-links');

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      toggleBtn.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
// ======================================
// Console Welcome Message
// ======================================
console.log(
  '%c🚀 Zyntex Infosoft',
  'font-size: 20px; font-weight: bold; color: #3b82f6;'
);
console.log(
  '%cBuilt with GSAP, modern CSS, and vanilla JavaScript',
  'font-size: 12px; color: #94a3b8;'
);
console.log(
  '%cVisit: zyntexinfosoft@gmail.com',
  'font-size: 12px; color: #10b981;'
);