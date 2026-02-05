import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Animation Logic - Only runs when content is loaded
    useEffect(() => {
        if (isLoaded) {
            const tl = gsap.timeline();

            // Play animation for 5 seconds
            tl.to(containerRef.current, {
                duration: 5,
                ease: "none"
            });

            // Fade out
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(containerRef.current, { display: "none" });
                    if (onComplete) onComplete();
                }
            });

            return () => tl.kill();
        }
    }, [isLoaded, onComplete]);

    // 2. Safety Timeout: Force load after 4 seconds if internet is too slow
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="preloader" ref={containerRef}>
            
            {/* Optimized for Slow Internet: WEBM Video */}
            <video 
                className="preloader-video" 
                autoPlay 
                muted 
                loop
                playsInline
                // Using onLoadedData to ensure it only plays when ready
                onLoadedData={() => setIsLoaded(true)}
                src="/videos/zyntex logo (1).webm"
            />
            
        </div>
    );
};

export default Preloader;
