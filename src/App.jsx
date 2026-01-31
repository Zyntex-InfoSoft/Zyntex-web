import { useState, useLayoutEffect, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Ensure standard CSS is imported if needed, or we handled it manually

import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Whychoose from "./components/Whychoose";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Global Background Elements */}
      <div className="noise-overlay"></div>
      <div className="grid-background">
        <div className="grid-background-orb grid-background-orb-1"></div>
        <div className="grid-background-orb grid-background-orb-2"></div>
        <div className="grid-background-orb grid-background-orb-3"></div>
        <div className="grid-background-grid"></div>
        <div className="grid-background-particles">
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
          <div className="particle-dot"></div>
        </div>
      </div>

      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="app-container">
          <Navbar />
          <Hero />
          <Services />
          <About />
          <Whychoose />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;