const Services = () => {
  return (
    <section id="services" className="section section-alt">
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
