import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/main.css';

const Whychoose = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header
      gsap.fromTo(".section-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%"
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
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".grid-3",
            start: "top 85%"
          }
        }
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  const featureData = [
    {
      title: "Real-time monitoring",
      description: "Track CPU, memory, API latency, network usage and custom metrics instantly."
    },
    {
      title: "Smart alerting",
      description: "Noise-free alerts with grouping, thresholds and escalation policies."
    },
    {
      title: "Secure by design",
      description: "Encryption, RBAC, access logs and zero-trust security practices."
    },
    {
      title: "Scales with you",
      description: "From startups to enterprises — scale infrastructure seamlessly."
    },
    {
      title: "Human support",
      description: "Talk directly with engineers, not bots or scripts."
    }
  ];

  return (
    <section id="features" className="section" ref={comp}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why teams choose Zyntex</h2>
          <p className="section-subtitle">
            Secure, reliable and scalable solutions built for modern businesses.
          </p>
        </div>

        <div className="grid grid-3">
          {featureData.map((feature, index) => (
            <div key={index} className="card small-card">
              <h3>{feature.title}</h3>
              <p className="muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whychoose;