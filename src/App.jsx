import { useState, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css"; // Ensure standard CSS is imported if needed, or we handled it manually

import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Whychoose from "./components/Whychoose";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Chatbot from "./components/Chatbot";
import Beams from "./components/Beams";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 1600);

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
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  return (
    <>

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <div className="app-container">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <Whychoose />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </>
  );
}

export default App;