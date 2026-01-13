import { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo1.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="site-header" ref={navRef}>
      <div className="container nav-container">

        {/* Logo */}
        <a href="#home" className="logo">
          <img src={logo} className="logo-img" alt="Zyntex Logo" />
        </a>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#features" className="nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#footer" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        {/* Toggle Button (AFTER navbar) */}
        <button
          className={`nav-toggle-btn ${menuOpen ? "open" : ""}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* CTA */}
        <a href="#contact" className="btn btn-primary nav-cta">
          Get a demo
        </a>

      </div>
    </header>
  );
};

export default Navbar;
