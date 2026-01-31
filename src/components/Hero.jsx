import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeD from "./ThreeD";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    // Wait for DOM to be ready
    if (!comp.current) return;

    let ctx = gsap.context(() => {
      // Get elements with null checks
      const heroTitle = comp.current.querySelector(".hero-title");
      const heroSubtitle = comp.current.querySelector(".hero-subtitle");
      const heroStats = comp.current.querySelectorAll(".hero-stat");

      // Hero Title with stagger effect
      if (heroTitle) {
        gsap.from(heroTitle, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      // Hero Subtitle
      if (heroSubtitle) {
        gsap.from(heroSubtitle, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      // Hero Stats with 3D effect
      if (heroStats.length > 0) {
        gsap.from(heroStats, {
          opacity: 0,
          y: 60,
          rotateX: -15,
          duration: 1,
          stagger: 0.15,
          delay: 0.9,
          ease: "power3.out",
        });
      }

      // Stats hover animation
      if (heroStats.length > 0) {
        heroStats.forEach(stat => {
          stat.addEventListener('mouseenter', () => {
            gsap.to(stat, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          stat.addEventListener('mouseleave', () => {
            gsap.to(stat, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={comp}>
      {/* 3D Background */}
      <ThreeD />
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <h1 className="hero-title">
            Powering Your Business with
            <br />
            <span>Intelligent Technology</span>
          </h1>

          <p className="hero-subtitle">
            Harness the power of AI, cloud computing, and cutting-edge 
            software to transform your operations and accelerate growth.
          </p>

          <div className="hero-actions">
            <a href="#footer" className="btn btn-primary btn-lg">
              Get Started
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#services" className="btn btn-outline btn-lg">
              Explore Solutions
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat">
              <span className="hero-stat-number">15+</span>
              <span className="hero-stat-label">Projects Delivered</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">10+</span>
              <span className="hero-stat-label">Enterprise Clients</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">99.9%</span>
              <span className="hero-stat-label">System Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
