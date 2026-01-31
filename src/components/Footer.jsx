import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/main.css'

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    let ctx = gsap.context(() => {
      const footer = footerRef.current.querySelector(".modern-footer");
      const brand = footerRef.current.querySelector(".footer-brand");
      const columns = footerRef.current.querySelectorAll(".footer-column");
      const bottomBar = footerRef.current.querySelector(".footer-bottom");
      const socialLinks = footerRef.current.querySelectorAll('.social-link');
      const navLinks = footerRef.current.querySelectorAll('.footer-nav-links a');

      // Brand animation
      if (brand && footer) {
        gsap.from(brand, {
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out"
        });
      }

      // Columns stagger animation
      if (columns.length > 0 && footer) {
        gsap.from(columns, {
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      }

      // Bottom bar animation
      if (bottomBar && footer) {
        gsap.from(bottomBar, {
          scrollTrigger: {
            trigger: footer,
            start: "top 80%",
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out"
        });
      }

      // Social links hover effects
      if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, {
              scale: 1.15,
              rotate: 5,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          });
          
          link.addEventListener('mouseleave', () => {
            gsap.to(link, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Nav links hover effects
      if (navLinks.length > 0) {
        navLinks.forEach(link => {
          const arrow = link.querySelector('span');
          
          link.addEventListener('mouseenter', () => {
            gsap.to(arrow, {
              x: 4,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          link.addEventListener('mouseleave', () => {
            gsap.to(arrow, {
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id='footer' ref={footerRef}>
      <footer className="modern-footer">
        <div className="footer-bg">
          <div className="footer-grid-pattern"></div>
          <div className="footer-orb"></div>
        </div>
        
        <div className="container">
          <div className="footer-content">
            
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo-wrapper">
                
                <h3 className="footer-brand-name">Zyntex InfoSoft</h3>
              </div>
              <p className="footer-tagline">
                Crafting next-generation digital experiences that transform businesses and inspire innovation.
              </p>
              <div className="footer-socials">
                <SocialIcon href="#" icon="linkedin" label="LinkedIn" />
                <SocialIcon href="#" icon="github" label="GitHub" />
                <SocialIcon href="#" icon="twitter" label="Twitter" />
                <SocialIcon href="#" icon="instagram" label="Instagram" />
              </div>
            </div>

            {/* Links Grid */}
            <div className="footer-links-grid">
              
              {/* Quick Links */}
              <div className="footer-column">
                <h4 className="footer-column-title">Navigation</h4>
                <ul className="footer-nav-links">
                  <li><a href="#home"><span>→</span>Home</a></li>
                  <li><a href="#services"><span>→</span>Services</a></li>
                  <li><a href="#features"><span>→</span>Features</a></li>
                  <li><a href="#about"><span>→</span>About Us</a></li>
                </ul>
              </div>

              {/* Services */}
              <div className="footer-column">
                <h4 className="footer-column-title">Services</h4>
                <ul className="footer-nav-links">
                  <li><a href="#services"><span>→</span>Web Development</a></li>
                  <li><a href="#services"><span>→</span>Mobile Apps</a></li>
                  <li><a href="#services"><span>→</span>CyerSecurity</a></li>
                  <li><a href="#services"><span>→</span>UI/UX Design</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="footer-column">
                <h4 className="footer-column-title">Get in Touch</h4>
                <div className="footer-contact">
                  <div className="contact-item">
                    <EmailIcon />
                    <a href="mailto:zyntexinfosoft@gmail.com">zyntexinfosoft@gmail.com</a>
                  </div>
                  <div className="contact-item">
                    <PhoneIcon />
                    <span>+91 96647 47560</span>
                  </div>
                  <div className="contact-item">
                    <LocationIcon />
                    <span>Bhavnagar, Gujarat, India</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright-text">
                © {currentYear} Zyntex Technologies. All rights reserved.
              </p>
              
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

// Contact Icons
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const SocialIcon = ({ href, icon, label }) => {
  const icons = {
    linkedin: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    twitter: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    instagram: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="var(--bg-dark)" strokeWidth="2"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="var(--bg-dark)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  };

  return (
    <a href={href} className="social-link" aria-label={label}>
      {icons[icon]}
    </a>
  );
};

export default Footer;