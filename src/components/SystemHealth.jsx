import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SystemHealth = () => {
  const comp = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    if (!comp.current) return;

    let ctx = gsap.context(() => {
      // Title animation
      const title = comp.current.querySelector(".health-title");
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            onEnter: () => setIsVisible(true),
          },
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      // Metric cards stagger
      const metricCards = comp.current.querySelectorAll(".metric-card");
      if (metricCards.length > 0) {
        metricCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            opacity: 0,
            y: 60,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
          });

          // Hover effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Status cards
      const statusCards = comp.current.querySelectorAll(".status-card-modern");
      if (statusCards.length > 0) {
        statusCards.forEach((card, index) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
          });
        });
      }

      // Progress rings animation
      const progressRings = comp.current.querySelectorAll(".progress-ring-circle");
      if (progressRings.length > 0) {
        progressRings.forEach((ring) => {
          const percent = ring.getAttribute("data-percent");
          const circumference = 2 * Math.PI * 54;
          const offset = circumference - (percent / 100) * circumference;
          
          ScrollTrigger.create({
            trigger: ring,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(ring, {
                strokeDashoffset: offset,
                duration: 2,
                ease: "power2.out",
              });
            },
          });
        });
      }

      // Live indicator pulse
      const liveIndicators = comp.current.querySelectorAll(".live-indicator");
      if (liveIndicators.length > 0) {
        liveIndicators.forEach((indicator) => {
          gsap.to(indicator, {
            scale: 1.2,
            opacity: 0.5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        });
      }

    }, comp);

    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: "99.99", suffix: "%", label: "Uptime", color: "#10b981" },
    { value: "24", suffix: "ms", label: "Avg Response", color: "#8b5cf6" },
    { value: "2.4", suffix: "M", label: "Requests/Day", color: "#06b6d4" },
    { value: "0", suffix: "", label: "Incidents", color: "#f59e0b" },
  ];

  const systems = [
    { name: "Cloud Infrastructure", status: "operational", percent: 100 },
    { name: "API Gateway", status: "operational", percent: 99.9 },
    { name: "Database Cluster", status: "operational", percent: 100 },
    { name: "CDN Network", status: "operational", percent: 99.8 },
  ];

  return (
    <section className="health-section" ref={comp}>
      {/* Background */}
      <div className="health-bg">
        <div className="health-grid"></div>
        <div className="health-glow health-glow-1"></div>
        <div className="health-glow health-glow-2"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="health-header">
          <h2 className="health-title">
            System <span className="gradient-text">Performance</span>
          </h2>
        </div>

        {/* Metrics Row */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div className="metric-card" key={index}>
              <div className="metric-glow" style={{ background: metric.color }}></div>
              <div className="metric-content">
                <div className="metric-value">
                  <AnimatedNumber 
                    value={parseFloat(metric.value)} 
                    suffix={metric.suffix}
                    isVisible={isVisible}
                    delay={index * 200}
                    decimals={metric.value.includes('.') ? metric.value.split('.')[1].length : 0}
                  />
                </div>
                <div className="metric-label">{metric.label}</div>
              </div>
              <div className="metric-icon" style={{ color: metric.color }}>
                {index === 0 && <UptimeIcon />}
                {index === 1 && <SpeedIcon />}
                {index === 2 && <RequestIcon />}
                {index === 3 && <AlertIcon />}
              </div>
            </div>
          ))}
        </div>

        {/* Status Section */}
        <div className="status-grid">
          {/* Live Status */}
          <div className="status-panel">
            <div className="panel-header">
              <h3>Live System Status</h3>
              <div className="live-badge">
                <span className="live-indicator"></span>
                Live
              </div>
            </div>
            
            <div className="status-list-modern">
              {systems.map((system, index) => (
                <div className="status-card-modern" key={index}>
                  <div className="status-info">
                    <span className="status-dot operational"></span>
                    <span className="status-name">{system.name}</span>
                  </div>
                  <div className="status-right">
                    <span className="status-badge">{system.status}</span>
                    <span className="status-percent">{system.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Ring */}
          <div className="performance-panel">
            <div className="panel-header">
              <h3>Overall Health</h3>
            </div>
            
            <div className="ring-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <circle
                  className="progress-ring-bg"
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                />
                <circle
                  className="progress-ring-circle"
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#healthGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54}
                  data-percent="99.9"
                  transform="rotate(-90 60 60)"
                />
                <defs>
                  <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="ring-content">
                <span className="ring-value">99.9%</span>
                <span className="ring-label">Healthy</span>
              </div>
            </div>

            <div className="health-stats">
              <div className="health-stat">
                <ServerIcon />
                <span>12 Servers</span>
              </div>
              <div className="health-stat">
                <RegionIcon />
                <span>4 Regions</span>
              </div>
              <div className="health-stat">
                <ServiceIcon />
                <span>28 Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Animated Number Component
const AnimatedNumber = ({ value, suffix, isVisible, delay, decimals }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (value - start) * easeOut;
        
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <span>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      <span className="metric-suffix">{suffix}</span>
    </span>
  );
};

// Icons
const UptimeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

const SpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const RequestIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17,8 12,3 7,8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);

const RegionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ServiceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 2,7 12,12 22,7 12,2"/>
    <polyline points="2,17 12,22 22,17"/>
    <polyline points="2,12 12,17 22,12"/>
  </svg>
);

export default SystemHealth;
