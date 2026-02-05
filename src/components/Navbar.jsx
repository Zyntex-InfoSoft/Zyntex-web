import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo1.jpg";
import '../assets/css/main.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.nav-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
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
          <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</a>

          <button
            className="btn btn-primary nav-cta-mobile"
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(new CustomEvent('openChatbot'));
            }}
          >
            Chat with us
          </button>
        </nav>

        <button
          className="btn btn-primary nav-cta-desktop"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('openChatbot'));
          }}
        >
          Chat with us
        </button>
      </div>
    </header>
  );
};

export default Navbar;