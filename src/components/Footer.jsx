import React from 'react';
import '../assets/css/main.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section id='footer'>
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-col">
            <h3 className="footer-logo">Zyntex Technologies</h3>
            <p className="muted">Innovative software solutions for modern businesses.</p>
            <p className="muted copyright">© {currentYear} All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#footer">Contact</a></li>
            </ul>
          </div>

          {/* Merged Contact Details */}
          <div className="footer-col">
            <h4>Contact Details</h4>
            <div className="footer-contact-item">
              <strong>Email</strong>
              <a href="mailto:zyntexinfosoft@gmail.com" className="muted">zyntexinfosoft@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <strong>Phone</strong>
              <span className="muted">+91 96647 47560 | +91 74330 40571</span>
            </div>
            <div className="footer-contact-item">
              <strong>Location</strong>
              <span className="muted">Bhavnagar, Gujarat, India</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
    </section>
  );
};

export default Footer;