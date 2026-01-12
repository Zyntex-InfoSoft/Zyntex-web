const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">

        <h1 className="hero-title">
          Build, secure & scale your digital infrastructure with confidence.
        </h1>

        <p className="hero-subtitle">
          Zyntex helps businesses modernize their IT systems through secure cloud solutions,
          automation, DevOps and real-time monitoring.
        </p>

        <div className="hero-actions">
          <a href="#footer" className="btn btn-primary btn-lg">Get started</a>
          <a href="#features" className="btn btn-outline btn-lg">Learn more</a>
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
