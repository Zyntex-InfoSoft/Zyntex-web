import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SystemHealth = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Status Bars Animation
      const statusFills = document.querySelectorAll(".status-fill");
      statusFills.forEach((fill) => {
        const width = fill.getAttribute("data-width");
        ScrollTrigger.create({
          trigger: fill,
          start: "top 85%",
          onEnter: () => {
            gsap.to(fill, {
              width: width,
              duration: 1.5,
              ease: "power2.out",
            });
          },
          once: true,
        });
      });

      // 2. Animate Section Header
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".section-subtitle", {
        scrollTrigger: {
          trigger: ".section-subtitle",
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // 3. Animate Highlights
      gsap.from(".feature-list li", {
        scrollTrigger: {
          trigger: ".feature-list",
          start: "top 80%",
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 4. Animate Number Counters
      const counters = document.querySelectorAll(".status-value");
      counters.forEach((counter) => {
        const valueText = counter.innerText;
        const target = parseFloat(valueText);
        const suffix = valueText.replace(/[0-9.]/g, "") || "";

        // Skip if not a number
        if (isNaN(target)) return;

        ScrollTrigger.create({
          trigger: counter,
          start: "top 85%",
          once: true,
          onEnter: () => {
            let proxy = { val: 0 };
            gsap.to(proxy, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                // Check if it's an integer or float based on input string
                const isFloat = valueText.includes('.');
                counter.innerText = (isFloat ? proxy.val.toFixed(1) : Math.round(proxy.val)) + suffix;
              }
            });
          }
        });
      });

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={comp}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Infrastructure health at a glance
          </h2>
          <p className="section-subtitle">
            Live insights into performance, uptime and system status — all in one view.
          </p>
        </div>

        <div className="grid grid-2">

          <div className="card">
            <h3>System Status</h3>
            <p className="muted">
              Real-time monitoring of cloud, network and security systems — helping you stay ahead of issues.
            </p>

            <div className="status-list">

              <div className="status-item">
                <div className="status-label-row">
                  <span>Cloud Services</span>
                  <span className="status-value">100%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="100%"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Network Infrastructure</span>
                  <span className="status-value">99.8%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="99.8%"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Security Systems</span>
                  <span className="status-value">100%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-warn"
                    data-width="100%"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Database Servers</span>
                  <span className="status-value">100%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="100%"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>

            </div>
          </div>

          <div className="card">
            <h3>Key Highlights</h3>
            <ul className="feature-list">
              <li>
                <span className="dot dot-green"></span>
                <div>
                  <strong>Proactive monitoring</strong>
                  <p className="muted">
                    Detect issues before they impact your business.
                  </p>
                </div>
              </li>

              <li>
                <span className="dot dot-cyan"></span>
                <div>
                  <strong>Unified dashboard</strong>
                  <p className="muted">
                    Metrics, logs and alerts in one place.
                  </p>
                </div>
              </li>

              <li>
                <span className="dot dot-purple"></span>
                <div>
                  <strong>Security built-in</strong>
                  <p className="muted">
                    Encrypted data, access control and full audits.
                  </p>
                </div>
              </li>

              <li>
                <span className="dot dot-orange"></span>
                <div>
                  <strong>Automation ready</strong>
                  <p className="muted">
                    Trigger workflows and scale automatically.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemHealth;
