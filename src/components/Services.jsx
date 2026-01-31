import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    if (!comp.current) return;

    let ctx = gsap.context(() => {
      const sectionLabel = comp.current.querySelector(".services-label");
      const sectionTitle = comp.current.querySelector(".services-title");
      const sectionSubtitle = comp.current.querySelector(".services-subtitle");
      const serviceCards = comp.current.querySelectorAll(".service-card-modern");
      const decorLines = comp.current.querySelectorAll(".decor-line");

      // Animated label
      if (sectionLabel) {
        gsap.from(sectionLabel, {
          scrollTrigger: {
            trigger: sectionLabel,
            start: "top 90%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Title with character split animation
      if (sectionTitle) {
        gsap.from(sectionTitle, {
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top 85%",
          },
          opacity: 0,
          y: 100,
          skewY: 5,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      // Subtitle
      if (sectionSubtitle) {
        gsap.from(sectionSubtitle, {
          scrollTrigger: {
            trigger: sectionSubtitle,
            start: "top 85%",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      // Decorative lines animation
      if (decorLines.length > 0) {
        decorLines.forEach((line, i) => {
          gsap.from(line, {
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
            },
            scaleX: 0,
            duration: 1.5,
            delay: i * 0.1,
            ease: "power4.out",
          });
        });
      }

      // Service Cards with staggered reveal
      if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
          const icon = card.querySelector(".service-icon-wrapper");
          const content = card.querySelector(".service-content");
          const number = card.querySelector(".service-num");
          const glow = card.querySelector(".card-glow");

          // Card entrance
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
            opacity: 0,
            y: 120,
            scale: 0.9,
            duration: 1,
            delay: index * 0.1,
            ease: "power4.out",
          });

          // Icon animation
          if (icon) {
            gsap.from(icon, {
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
              scale: 0,
              rotation: -180,
              duration: 1,
              delay: index * 0.1 + 0.3,
              ease: "back.out(1.7)",
            });
          }

          // Number reveal
          if (number) {
            gsap.from(number, {
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
              opacity: 0,
              x: -30,
              duration: 0.8,
              delay: index * 0.1 + 0.4,
              ease: "power3.out",
            });
          }

          // Hover animations
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              scale: 1.03,
              duration: 0.4,
              ease: "power2.out",
            });
            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                scale: 1.3,
                duration: 0.5,
                ease: "power2.out",
              });
            }
            if (icon) {
              gsap.to(icon, {
                scale: 1.15,
                rotation: 10,
                duration: 0.4,
                ease: "back.out(1.7)",
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
            if (glow) {
              gsap.to(glow, {
                opacity: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            }
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          });
        });
      }
    }, comp);

    return () => ctx.revert();
  }, []);

  const services = [
    { 
      icon: <WebDevIcon />, 
      title: "Web Development", 
      desc: "Custom web applications built with React, Next.js, and modern frameworks for exceptional user experiences.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      icon: <UIUXIcon />, 
      title: "UI/UX Design", 
      desc: "Beautiful, intuitive interfaces crafted with user-centered design principles for exceptional digital experiences.",
      gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    { 
      icon: <SecurityIcon />, 
      title: "Cybersecurity", 
      desc: "Enterprise-grade security with penetration testing, threat monitoring, and compliance management.",
      gradient: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)"
    },
    { 
      icon: <DashboardIcon />, 
      title: "Admin Dashboard", 
      desc: "Powerful admin panels with real-time analytics, data visualization, and comprehensive management tools.",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)"
    },
    { 
      icon: <DevOpsIcon />, 
      title: "DevOps & CI/CD", 
      desc: "Automated pipelines with Docker, Kubernetes, and infrastructure as code for rapid deployment.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      icon: <MobileIcon />, 
      title: "Mobile Apps", 
      desc: "Native iOS/Android and cross-platform apps with React Native and Flutter for maximum reach.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
  ];

  return (
    <section id="services" className="services-section" ref={comp}>
      {/* Background Elements */}
      <div className="services-bg">
        <div className="services-grid-pattern"></div>
        <div className="services-gradient-orb services-orb-1"></div>
        <div className="services-gradient-orb services-orb-2"></div>
      </div>

      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <h2 className="services-title">
            Solutions That <span className="gradient-text">Power Growth</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card-modern" key={index}>
              <div className="card-glow" style={{ background: service.gradient }}></div>
              <div className="service-card-inner">
                <div className="service-icon-wrapper" style={{ background: service.gradient }}>
                  {service.icon}
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
                <div className="service-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Modern SVG Icons
const WebDevIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16,18 22,12 16,6"></polyline>
    <polyline points="8,6 2,12 8,18"></polyline>
    <line x1="14" y1="4" x2="10" y2="20"></line>
  </svg>
);

const UIUXIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
  </svg>
);

const SecurityIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const DashboardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const DevOpsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const MobileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

export default Services;
