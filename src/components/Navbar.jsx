import logo from "../assets/images/logo1.jpg";

const Navbar = () => {
  return (
    <header className="site-header">
      <div className="container nav-container">
        <div className="logo">
          <img src={logo} className="logo-img" alt="Zyntex Logo" />
        </div>

        <button className="nav-toggle-btn" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#footer" className="nav-link">Contact</a>
        </nav>

        <a href="#contact" className="btn btn-primary nav-cta">
          Get a demo
        </a>
      </div>
    </header>
  );
};

export default Navbar;
