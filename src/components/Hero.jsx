import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Title
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Hero Subtitle
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Hero Actions (Buttons)
      gsap.from(".hero-actions", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // Hero Stats
      gsap.from(".hero-stat", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8,
        ease: "power3.out",
      });

      // Particles Animation
      gsap.to(".particle", {
        y: -100,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: { each: 2, from: "random" },
      });

      // Parallax Effect
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        opacity: 0.5,
        ease: "none",
      });

      // Magnetic Buttons
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={comp}>
      <div className="container hero-content">
        <h1 className="hero-title">
          <span className="glitch-wrapper">
            <span className="glitch" data-text="Build, secure & scale">Build, secure & scale</span>
          </span>
          {" "}your digital infrastructure with confidence.
        </h1>

        <p className="hero-subtitle">
          Zyntex helps businesses modernize their IT systems through secure cloud solutions,
          automation, DevOps and real-time monitoring.
        </p>

        <div className="hero-actions">
          <a href="#footer" className="btn btn-primary btn-lg">
            Get started
          </a>
          <a href="#features" className="btn btn-outline btn-lg">
            Learn more
          </a>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat">
            <span className="hero-stat-number">99.9%</span>
            <span className="hero-stat-label">Service reliability</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">10+</span>
            <span className="hero-stat-label">Projects delivered</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">24/7</span>
            <span className="hero-stat-label">Technical support</span>
          </div>
        </div>
      </div>

      <div className="particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="particle" key={i}></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
