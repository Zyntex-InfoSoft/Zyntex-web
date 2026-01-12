const SystemHealth = () => {
  return (
    <section className="section">
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
                  <span className="status-value">10.0%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="10.0%"
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Network Infrastructure</span>
                  <span className="status-value">0.2%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="0.2%"
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Security Systems</span>
                  <span className="status-value">10.0%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-warn"
                    data-width="10.0%"
                  ></div>
                </div>
              </div>

              <div className="status-item">
                <div className="status-label-row">
                  <span>Database Servers</span>
                  <span className="status-value">10.0%</span>
                </div>
                <div className="status-bar">
                  <div
                    className="status-fill status-ok"
                    data-width="10.0%"
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
