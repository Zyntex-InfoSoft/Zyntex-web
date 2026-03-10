import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "./Preloader.css";

const PRELOADER_PLAYBACK_RATE = 1.12;
const PRELOADER_TOTAL_MS = 5000;
const PRELOADER_FADE_DURATION = 0.4;
const PRELOADER_EXIT_DELAY_MS = PRELOADER_TOTAL_MS - PRELOADER_FADE_DURATION * 1000;

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const hasCompletedRef = useRef(false);
    const [canExit, setCanExit] = useState(false);

    const handleVideoReady = (event) => {
        event.currentTarget.playbackRate = PRELOADER_PLAYBACK_RATE;
    };

    // Exit only once to avoid duplicate callbacks in StrictMode.
    useEffect(() => {
        if (!canExit || !containerRef.current || hasCompletedRef.current) return;

        hasCompletedRef.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        tl.to(containerRef.current, {
            opacity: 0,
            duration: PRELOADER_FADE_DURATION,
            ease: "power2.inOut",
        });

        return () => tl.kill();
    }, [canExit, onComplete]);

    // Fixed 5-second preloader timeline (including fade-out duration).
    useEffect(() => {
        const timer = setTimeout(() => setCanExit(true), PRELOADER_EXIT_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="preloader" ref={containerRef}>
            {/* Video Background */}
            <video
                className="preloader-video"
                autoPlay
                muted
                playsInline
                onLoadedMetadata={handleVideoReady}
                onPlay={handleVideoReady}
                src="/videos/zyntex logo (1).webm"
            />
        </div>
    );
};

export default Preloader;
