import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Services = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Section Header
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Service Cards
      gsap.utils.toArray(".service-card").forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section section-alt" ref={comp}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Modern IT solutions designed to keep your business secure.
          </p>
        </div>

        <div className="grid grid-3">
          <ServiceCard icon="💻" title="Web Development" />
          <ServiceCard icon="🛡️" title="Cybersecurity" />
          <ServiceCard icon="🎨" title="UI / UX Design" />
          <ServiceCard icon="📊" title="Admin Dashboard" />
          <ServiceCard icon="⚙️" title="DevOps & Automation" />
          <ServiceCard icon="📱" title="Mobile App Development" />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title }) => (
  <article className="card service-card">
    <div className="icon-circle">{icon}</div>
    <h3>{title}</h3>
    <p className="muted">
      High-quality, scalable solutions tailored for modern businesses.
    </p>
  </article>
);

export default Services;
