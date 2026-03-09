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

            // Keep the animation brief so content is not delayed.
            tl.to(containerRef.current, {
                duration: 0.8,
                ease: "none"
            });

            // Fade out
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.45,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(containerRef.current, { display: "none" });
                    if (onComplete) onComplete();
                }
            });

            return () => tl.kill();
        }
    }, [isLoaded, onComplete]);

    // 2. Safety Timeout: force finish quickly if media loading lags.
    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="preloader" ref={containerRef}>

            {/* Fallback Loader (visible if video is slow) */}
            {!isLoaded && <div className="preloader-spinner"></div>}

            {/* Video Background */}
            <video
                className="preloader-video"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setIsLoaded(true)}
                src="/videos/zyntex logo (1).webm"
            />
        </div>
    );
};

export default Preloader;
