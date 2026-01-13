// Component Imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SystemHealth from "./components/SystemHealth";
import About from "./components/About";
import Whychoose from "./components/Whychoose";
import BackgroundVideo from "./components/BackgroundVideo";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
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
      )}
    </>
  );
}