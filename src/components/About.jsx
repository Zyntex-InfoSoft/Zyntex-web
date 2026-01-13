import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Section Header
      gsap.fromTo(".section-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 80%",
          }
        }
      );

      // Cards Stagger
      gsap.fromTo(".card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 80%",
          }
        }
      );

      // List Items Stagger
      gsap.utils.toArray(".bullet-list li").forEach((li, i) => {
        gsap.fromTo(li,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: li,
              start: "top 90%",
            }
          }
        );
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section section-alt" ref={comp}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Zyntex</h2>
          <p className="section-subtitle">
            We are a team of engineers and security specialists delivering secure,
            scalable and reliable IT solutions.
          </p>
        </div>

        <div className="grid grid-2 about-grid">
          <div className="card">
            <h3>Our Mission</h3>
            <p className="muted">
              Our mission is to help businesses deploy, manage and secure modern
              digital systems without the need for large internal teams.
            </p>
            <p className="muted">
              From architecture to deployment — we stay with you at every step.
            </p>
            <ul className="bullet-list">
              <li>Cloud-native, scalable and secure architectures.</li>
              <li>Automation that accelerates development cycles.</li>
              <li>Visibility into performance, outages and risk.</li>
            </ul>
          </div>

          <div className="card">
            <h3>What we value</h3>
            <ul className="value-list">
              <li>
                <strong>Security first</strong>
                <span className="muted">
                  Your uptime and data always come first.
                </span>
              </li>
              <li>
                <strong>Transparency</strong>
                <span className="muted">
                  Clear communication, clear reporting.
                </span>
              </li>
              <li>
                <strong>Innovation</strong>
                <span className="muted">
                  Modern tools that truly add value.
                </span>
              </li>
              <li>
                <strong>Partnership</strong>
                <span className="muted">
                  We act as an extension of your team.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
