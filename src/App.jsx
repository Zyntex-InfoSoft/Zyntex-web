import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Component Imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SystemHealth from "./components/SystemHealth";
import About from "./components/About";
import Whychoose from "./components/Whychoose";
import BackgroundVideo from "./components/BackgroundVideo";
import Footer from "./components/Footer";

// Animation Imports
import {
  initHeaderScroll,
  initSmoothScrolling,
  initGSAPAnimations,
  initVideoBackground,
  initNumberCounters,
  initStatusBars,
  initMobileMenu,
  initFormHandler,
} from "./gsap/animations";

export default function App() {
  useLayoutEffect(() => {
    // 1. Initialize Listeners that return cleanup functions
    const cleanupHeader = initHeaderScroll();
    const cleanupVideo = initVideoBackground();
    const cleanupMenu = initMobileMenu();
    
    // 2. Initialize Standard Logic
    initSmoothScrolling();
    initNumberCounters();
    initStatusBars();
    initFormHandler();

    // 3. Initialize GSAP Animations and capture the Context
    // The updated animations.js returns ctx (the GSAP context)
    const animationCtx = initGSAPAnimations();

    // 4. Final Cleanup Function
    return () => {
      // Revert GSAP animations (fixes the "double-from" glitch)
      if (animationCtx) animationCtx.revert();
      
      // Remove event listeners to prevent memory leaks
      if (cleanupHeader) cleanupHeader();
      if (cleanupVideo) cleanupVideo();
      if (cleanupMenu) cleanupMenu();

      // Kill any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <SystemHealth />
        <About />
        {/* <Contact /> */}
        <Whychoose />
      </main>

      <BackgroundVideo />
      <Footer />
    </>
  );
}