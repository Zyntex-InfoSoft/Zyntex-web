import React, { useState } from "react";
import logo from "../assets/images/logo1.jpg";
import '../assets/css/main.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <div className="logo">
          <img src={logo} className="logo-img" alt="Zyntex Logo" />
        </div>

        {/* Hamburger Button */}
        <button 
          className={`nav-toggle-btn ${isOpen ? "active" : ""}`} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#features" className="nav-link" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About</a>
          <a href="#footer" className="nav-link" onClick={() => setIsOpen(false)}>Contact</a>
          
          <a href="#footer" className="btn btn-primary nav-cta-mobile" onClick={() => setIsOpen(false)}>
            Get a demo
          </a>
        </nav>

        <a href="#footer" className="btn btn-primary nav-cta-desktop">
          Get a demo
        </a>
      </div>
    </header>
  );
};

export default Navbar;