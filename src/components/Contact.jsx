import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Toast Component
const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`toast-container ${isVisible ? 'toast-visible' : ''}`}>
      <div className={`toast toast-${type}`}>
        <div className="toast-icon">
          {type === 'success' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <div className="toast-content">
          <span className="toast-title">{type === 'success' ? 'Success!' : 'Oops!'}</span>
          <span className="toast-message">{message}</span>
        </div>
        <button className="toast-close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div className="toast-progress">
          <div className={`toast-progress-bar toast-progress-${type}`}></div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [focusedField, setFocusedField] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const serviceOptions = [
    { value: 'Web Development', icon: '🌐', label: 'Web Development' },
    { value: 'Mobile App', icon: '📱', label: 'Mobile App Development' },
    { value: 'UI/UX Design', icon: '🎨', label: 'UI/UX Design' },
    { value: 'Cloud Solutions', icon: '☁️', label: 'Cloud Solutions' },
    { value: 'AI & ML', icon: '🤖', label: 'AI & Machine Learning' },
    { value: 'Cybersecurity', icon: '🔒', label: 'Cybersecurity' },
    { value: 'Consulting', icon: '💼', label: 'Consulting' },
    { value: 'Other', icon: '✨', label: 'Other' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Animate header
      gsap.from(".contact-badge", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".contact-subtitle", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      // Animate main content
      gsap.from(".contact-main", {
        scrollTrigger: {
          trigger: ".contact-main",
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Animate info items
      gsap.from(".info-item", {
        scrollTrigger: {
          trigger: ".info-items",
          start: "top 90%",
        },
        opacity: 0,
        x: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Phone validation - only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = () => {
    if (formData.phone && formData.phone.length !== 10) {
      return false;
    }
    return true;
  };

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number
    if (formData.phone && formData.phone.length !== 10) {
      showToast("Please enter a valid 10-digit phone number", "error");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "840a0115-c932-4b3c-a1e9-4dcbb1bea623",
          from_name: "Zyntex Website",
          subject: `New Inquiry from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          service: formData.service || "General Inquiry",
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showToast("Your message has been sent! We'll get back to you within 24 hours.", "success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        
        // Animate form reset
        if (formRef.current) {
          gsap.fromTo(formRef.current, 
            { opacity: 0.5, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
          );
        }
      } else {
        throw new Error("Failed");
      }
    } catch {
      showToast("Something went wrong. Please try again or contact us directly.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.visible} 
        onClose={hideToast} 
      />
      
      <section id="contact" className="contact-section" ref={sectionRef}>
        {/* Background Elements */}
        <div className="contact-bg">
          <div className="contact-gradient-orb contact-orb-1"></div>
          <div className="contact-gradient-orb contact-orb-2"></div>
          <div className="contact-grid-pattern"></div>
        </div>

        <div className="container">
          {/* Header */}
          <div className="contact-header">
            <span className="contact-badge">
              <span className="badge-dot"></span>
              Get In Touch
            </span>
            <h2 className="contact-title">
              Let's Start a <span>Conversation</span>
            </h2>
            <p className="contact-subtitle">
              Have a project in mind? We'd love to hear about it. Send us a message 
              and we'll respond as soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="contact-main">
            {/* Form Side */}
            <div className="contact-form-container">
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form-modern">
                <div className="form-grid">
                  {/* Name Field */}
                  <div className={`form-field ${focusedField === 'name' || formData.name ? 'focused' : ''}`}>
                    <div className="field-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="name">Your Name</label>
                    <div className="field-line"></div>
                  </div>

                  {/* Email Field */}
                  <div className={`form-field ${focusedField === 'email' || formData.email ? 'focused' : ''}`}>
                    <div className="field-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                    <div className="field-line"></div>
                  </div>

                  {/* Phone Field */}
                  <div className={`form-field ${focusedField === 'phone' || formData.phone ? 'focused' : ''} ${formData.phone && formData.phone.length > 0 && formData.phone.length !== 10 ? 'has-error' : ''}`}>
                    <div className="field-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      maxLength={10}
                      inputMode="numeric"
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <span className="phone-hint">{formData.phone.length}/10</span>
                    <div className="field-line"></div>
                  </div>

                  {/* Service Field - Custom Dropdown */}
                  <div className={`form-field form-field-select ${formData.service ? 'focused' : ''}`} ref={dropdownRef}>
                    <div className="field-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                      </svg>
                    </div>
                    <input type="hidden" name="service" value={formData.service} />
                    <div 
                      className={`custom-dropdown ${dropdownOpen ? 'open' : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <div className="dropdown-selected">
                        {formData.service ? (
                          <>
                            <span className="dropdown-icon">
                              {serviceOptions.find(opt => opt.value === formData.service)?.icon}
                            </span>
                            <span>{serviceOptions.find(opt => opt.value === formData.service)?.label}</span>
                          </>
                        ) : (
                          <span className="dropdown-placeholder">Choose service...</span>
                        )}
                      </div>
                      <div className={`dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                    <div className={`dropdown-options ${dropdownOpen ? 'show' : ''}`}>
                      {serviceOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`dropdown-option ${formData.service === option.value ? 'selected' : ''}`}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, service: option.value }));
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="option-icon">{option.icon}</span>
                          <span className="option-label">{option.label}</span>
                          {formData.service === option.value && (
                            <svg className="option-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    <label htmlFor="service">Service Interested In</label>
                    <div className="field-line"></div>
                  </div>
                </div>

                {/* Message Field - Full Width */}
                <div className={`form-field form-field-full ${focusedField === 'message' || formData.message ? 'focused' : ''}`}>
                  <div className="field-icon field-icon-textarea">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows="4"
                    required
                  ></textarea>
                  <label htmlFor="message">Tell us about your project</label>
                  <div className="field-line"></div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                  <span className="btn-icon">
                    {isSubmitting ? (
                      <svg className="spinner-icon" width="20" height="20" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    )}
                  </span>
                  <span className="btn-bg"></span>
                </button>
              </form>
            </div>

            {/* Info Side */}
            <div className="contact-info-side">
              <div className="info-card">
                <div className="info-card-header">
                  <h3>Contact Information</h3>
                  <p>Fill out the form and we'll be in touch within 24 hours</p>
                </div>

                <div className="info-items">
                  <a href="mailto:zyntexinfosoft@gmail.com" className="info-item">
                    <div className="info-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Email</span>
                      <span className="info-value">zyntexinfosoft@gmail.com</span>
                    </div>
                  </a>

                  <a href="tel:+919664747560" className="info-item">
                    <div className="info-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Phone</span>
                      <span className="info-value">+91 96647 47560</span>
                    </div>
                  </a>

                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Location</span>
                      <span className="info-value">Bhavnagar, Gujarat, India</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div className="info-text">
                      <span className="info-label">Working Hours</span>
                      <span className="info-value">Mon - Sat, 10AM - 7PM IST</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="info-social">
                  <span className="social-label">Follow Us</span>
                  <div className="social-links-contact">
                    <a href="#" className="social-link-contact" aria-label="LinkedIn">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link-contact" aria-label="Twitter">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link-contact" aria-label="Instagram">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link-contact" aria-label="GitHub">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="info-card-decor">
                  <div className="decor-circle decor-circle-1"></div>
                  <div className="decor-circle decor-circle-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
