import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const tl = gsap.timeline();

        // Let video play for 5 seconds clean
        tl.to(containerRef.current, {
            duration: 5,
            ease: "none"
        });

        // Then fade out preloader
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(containerRef.current, { display: "none" });
                if (onComplete) onComplete();
            }
        }, 5);

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div className="preloader" ref={containerRef}>
            {/* Background Video - Clean, no overlays */}
            <video 
                className="preloader-video" 
                autoPlay 
                muted 
                loop
                src="/videos/zyntex logo (1).mp4"
            />
        </div>
    );
};

export default Preloader;
