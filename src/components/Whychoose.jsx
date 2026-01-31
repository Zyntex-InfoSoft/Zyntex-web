import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/main.css';

gsap.registerPlugin(ScrollTrigger);

const Whychoose = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    if (!comp.current) return;

    let ctx = gsap.context(() => {
      // Floating orbs animation
      const orbs = comp.current.querySelectorAll(".why-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: "random(-40, 40)",
          x: "random(-30, 30)",
          duration: "random(5, 7)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.7,
        });
      });

      // Header animations
      const header = comp.current.querySelector(".why-choose-header");
      const label = comp.current.querySelector(".why-label");
      const title = comp.current.querySelector(".why-title");
      const subtitle = comp.current.querySelector(".why-subtitle");

      if (label) {
        gsap.from(label, {
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      // Feature cards staggered animation
      const featureCards = comp.current.querySelectorAll(".why-feature-card");
      featureCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });

        // Hover animation for icon
        const icon = card.querySelector('.feature-icon');
        const arrow = card.querySelector('.feature-arrow');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            scale: 1.2,
            rotate: 10,
            duration: 0.5,
            ease: "back.out(1.7)"
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 5,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          if (arrow) {
            gsap.to(arrow, {
              x: 0,
              opacity: 0.5,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  const featureData = [
    {
      icon: "lightning",
      title: "Lightning Fast Performance",
      description: "Optimized code and cutting-edge technology deliver blazing-fast load times and seamless user experiences.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: "palette",
      title: "Stunning Design",
      description: "Pixel-perfect interfaces that captivate users and elevate your brand with modern, innovative aesthetics.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "rocket",
      title: "Future-Ready Solutions",
      description: "Built with scalability in mind, our solutions grow with your business and adapt to emerging technologies.",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: "shield",
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols protect your data with industry-leading best practices.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: "target",
      title: "Precision Engineering",
      description: "Every line of code is crafted with attention to detail, ensuring reliability and maintainability.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "diamond",
      title: "Premium Support",
      description: "Dedicated support team available 24/7 to ensure your success with expert guidance and rapid response.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="features" className="why-choose-section" ref={comp}>
      <div className="why-choose-bg">
        <div className="why-grid-pattern"></div>
        <div className="why-orb why-orb-1"></div>
        <div className="why-orb why-orb-2"></div>
      </div>
      
      <div className="container">
        <div className="why-choose-header">
          <div className="why-label">
            <span className="label-dot"></span>
            Why Choose Us
          </div>
          <h2 className="why-title">
            Next Generation
            <br />
            <span className="why-highlight">Digital Excellence</span>
          </h2>
        </div>

        <div className="why-features-grid">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="why-feature-card">
    <div className="feature-card-glow"></div>
    <div className="feature-card-inner">
      <div className="feature-icon-wrapper">
        <div className={`feature-icon-bg ${gradient}`}></div>
        <div className="feature-icon">
          {icon === 'lightning' && <LightningIcon />}
          {icon === 'palette' && <PaletteIcon />}
          {icon === 'rocket' && <RocketIcon />}
          {icon === 'shield' && <ShieldIcon />}
          {icon === 'target' && <TargetIcon />}
          {icon === 'diamond' && <DiamondIcon />}
        </div>
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
      <div className="feature-arrow">→</div>
    </div>
  </div>
);

// Professional Premium Icons
const LightningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5"/>
    <circle cx="17.5" cy="10.5" r=".5"/>
    <circle cx="8.5" cy="7.5" r=".5"/>
    <circle cx="6.5" cy="12.5" r=".5"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/>
  </svg>
);

export default Whychoose;