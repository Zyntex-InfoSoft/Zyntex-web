import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    if (!comp.current) return;

    let ctx = gsap.context(() => {
      // Floating orbs animation
      const orbs = comp.current.querySelectorAll(".about-orb");
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          duration: "random(4, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        });
      });

      // Main title reveal
      const titleChars = comp.current.querySelectorAll(".about-char");
      if (titleChars.length > 0) {
        gsap.from(titleChars, {
          scrollTrigger: {
            trigger: ".about-hero",
            start: "top 80%",
          },
          y: 120,
          opacity: 0,
          rotationX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "back.out(1.7)",
        });
      }

      // Subtitle fade in
      const subtitle = comp.current.querySelector(".about-subtitle");
      if (subtitle) {
        gsap.from(subtitle, {
          scrollTrigger: {
            trigger: subtitle,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        });
      }

      // Bento cards stagger
      const contentBlocks = comp.current.querySelectorAll(".content-block");
      contentBlocks.forEach((block, index) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
          },
          opacity: 0,
          y: 60,
          scale: 0.98,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
        });
      });

      // Counter animation
      const counters = comp.current.querySelectorAll(".counter-value");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        ScrollTrigger.create({
          trigger: counter,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: 2.5,
              ease: "power2.out",
              snap: { innerText: 1 },
              onUpdate: function() {
                counter.innerText = Math.round(gsap.getProperty(counter, "innerText"));
              }
            });
          },
        });
      });

      // Horizontal line grow
      const lines = comp.current.querySelectorAll(".about-line");
      lines.forEach((line) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
          scaleX: 0,
          duration: 1.5,
          ease: "power3.inOut",
        });
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="about-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="about" className="about-section" ref={comp}>
      {/* Animated Background */}
      <div className="about-bg">
        <div className="about-grid-pattern"></div>
        <div className="about-orb orb-1"></div>
        <div className="about-orb orb-2"></div>
        <div className="about-orb orb-3"></div>
      </div>

      <div className="container">
        {/* Hero Area */}
        <div className="about-hero">
          <div className="about-label">
            <span className="label-dot"></span>
            About Zyntex
          </div>
          <h2 className="about-title">
            {splitText("Next Generation")}
            <br />
            <span className="title-highlight">{splitText("Digital Innovation")}</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="about-content-grid">
          
          {/* Story Section */}
          <div className="content-block story-block">
            <div className="block-header">
              <span className="block-number">01</span>
              <h3>Our Story</h3>
            </div>
            <div className="block-body">
              <span className="story-year">Est. 2015</span>
              <p>
                What started as a small team with big dreams has evolved into a 
                full-service digital agency. Over the years, we've partnered with 
                innovative startups and established enterprises, helping them transform 
                their digital presence and achieve remarkable growth.
              </p>
              <div className="story-tags">
                <span>Innovation</span>
                <span>Excellence</span>
                <span>Partnership</span>
              </div>
            </div>
          </div>

          {/* Mission, Vision & Core Values Section */}
          <div className="content-block mission-block">
            <div className="block-header">
              <span className="block-number">02</span>
              <h3>Mission, Vision & Values</h3>
            </div>
            <div className="block-body">
              <div className="mission-vision-wrapper">
                <div className="mission-item">
                  <div className="mission-icon">
                    <TargetIcon />
                  </div>
                  <div>
                    <h4>Our Mission</h4>
                    <p>To empower businesses with cutting-edge technology solutions that drive sustainable growth and create meaningful impact.</p>
                  </div>
                </div>
                <div className="mission-item">
                  <div className="mission-icon">
                    <EyeIcon />
                  </div>
                  <div>
                    <h4>Our Vision</h4>
                    <p>To be the most trusted digital partner, recognized for innovation, quality, and transformative solutions worldwide.</p>
                  </div>
                </div>
              </div>
              
              <div className="values-divider"></div>
              
              <div className="values-grid">
                <div className="value-card">
                  <SparkIcon />
                  <h5>Innovation First</h5>
                  <p>Pushing boundaries with creative solutions</p>
                </div>
                <div className="value-card">
                  <HeartIcon />
                  <h5>Client Success</h5>
                  <p>Your growth is our priority</p>
                </div>
                <div className="value-card">
                  <ShieldIcon />
                  <h5>Trust & Integrity</h5>
                  <p>Building lasting relationships</p>
                </div>
                <div className="value-card">
                  <RocketIcon />
                  <h5>Continuous Growth</h5>
                  <p>Always learning and evolving</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="content-block stats-block">
            <div className="block-header">
              <span className="block-number">03</span>
              <h3>By The Numbers</h3>
            </div>
            <div className="block-body">
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="counter-value" data-target="15">0</span>
                  <span className="stat-plus">+</span>
                  <p>Projects Delivered</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="counter-value" data-target="98">0</span>
                  <span className="stat-percent">%</span>
                  <p>Client Satisfaction</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="counter-value" data-target="10">0</span>
                  <span className="stat-plus">+</span>
                  <p>Team Members</p>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="counter-value" data-target="3">0</span>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="content-block cta-block">
            <div className="cta-content">
              <h3>Ready to Transform Your Digital Presence?</h3>
              <p>Let's collaborate to bring your vision to life</p>
              <a href="#contact" className="cta-btn">
                Start Your Project
                <ArrowIcon />
              </a>
            </div>
            <div className="cta-decoration">
              <div className="deco-circle"></div>
              <div className="deco-dots">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Icons
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const SparkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1M5.6 5.6l.7.7m12.1-.7-.7.7m-12.1 11.4.7-.7m12.1.7-.7-.7"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default About;
