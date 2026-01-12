import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// ======================================
// 1. GSAP Animations (Fixes Disappearing Buttons)
// ======================================
export function initGSAPAnimations() {
  // gsap.context() is the "secret sauce" for React. 
  // It records all animations and allows us to revert them perfectly.
  const ctx = gsap.context(() => {
    
    // Hero Section Animations
    gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power3.out' });
    
    // Fixed: hero-actions (buttons) won't disappear anymore
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

    // Animate particles
    gsap.to('.particle', {
      y: -100,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
      stagger: { each: 2, from: 'random' }
    });

    // Section Headers
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

    // Service Cards
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

    // Parallax effect on hero
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
  });

  return ctx; // Return the context so App.jsx can call ctx.revert()
}

// ======================================
// 2. Video Background (Fixes Dark/Blur Issue)
// ======================================
export function initVideoBackground() {
  const video = document.getElementById('bg-video');
  const contactSection = document.getElementById('contact');
  if (!video) return;

  // Ensure video starts at a visible opacity
  gsap.set(video, { opacity: 0.3 });

  const handleScroll = () => {
    if (!contactSection) return;
    const contactTop = contactSection.offsetTop;
    const contactHeight = contactSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    // Fade slightly more when over contact section
    if (scrollPosition >= contactTop && scrollPosition <= contactTop + contactHeight) {
      gsap.to(video, { opacity: 0.1, duration: 0.5 });
    } else {
      gsap.to(video, { opacity: 0.3, duration: 0.5 });
    }
  };

  window.addEventListener('scroll', handleScroll);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => entry.isIntersecting ? video.play() : video.pause());
  }, { threshold: 0.1 });

  observer.observe(video);

  return () => window.removeEventListener('scroll', handleScroll);
}
export function initNumberCounters() {
  const ctx = gsap.context(() => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      // Get the target number (e.g., 100)
      const target = parseFloat(counter.getAttribute('data-count'));
      // Extract the suffix like "%" or "+" automatically
      const suffix = counter.innerText.replace(/[0-9.]/g, '') || ""; 

      gsap.to(counter, {
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        // We animate a virtual object to keep the text clean
        innerText: target, 
        duration: 2,
        ease: "power2.out",
        // Force the start value to 0 for the "0 to 100" effect
        modifiers: {
          innerText: (value) => {
            // This ensures we always show 1 decimal place or whole numbers
            return (Math.floor(value)) + suffix;
          }
        },
        // Fallback for older GSAP versions or specific formatting
        onStart: () => {
          counter.innerText = "0" + suffix;
        }
      });
    });
  });

  return ctx; 
}
// ======================================
// 4. Status Bar Animation
// ======================================
export function initStatusBars() {
  const statusFills = document.querySelectorAll('.status-fill');
  statusFills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(fill, { width: width + '%', duration: 1.5, ease: 'power2.out' });
      },
      once: true
    });
  });
}

// ======================================
// 5. Header Scroll Effect
// ======================================
export function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const handleScroll = () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}

// ======================================
// 6. Smooth Scrolling
// ======================================
export function initSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) navToggle.checked = false;
        
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ======================================
// 7. Mobile Menu
// ======================================
export function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navToggle) return;

  const closeMenu = (e) => {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.nav-toggle-label');
    if (navToggle.checked && !nav?.contains(e.target) && !toggle?.contains(e.target)) {
      navToggle.checked = false;
    }
  };

  document.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', () => navToggle.checked = false));
  return () => document.removeEventListener('click', closeMenu);
}

// ======================================
// 8. Form Handler
// ======================================
export function initFormHandler() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Sent Successfully!';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });
}