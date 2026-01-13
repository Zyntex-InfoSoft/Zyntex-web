import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
    const comp = useRef(null);
    const [progress, setProgress] = useState(0);

    // 8x8 Grid
    const rows = 8;
    const cols = 8;
    const cubes = Array.from({ length: rows * cols }, (_, i) => i);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 0. Set initial state explicitly
            gsap.set(".loader-cube", { scale: 0, opacity: 0 });

            // 1. Reveal Grid (Pop in)
            tl.to(".loader-cube", {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: {
                    grid: [rows, cols],
                    from: "center",
                    amount: 0.5
                },
                ease: "back.out(1.7)"
            });

            // 2. Pulse / Wave Effect
            tl.to(".loader-cube", {
                scale: 0.5,
                opacity: 0.8,
                duration: 0.5,
                yoyo: true,
                repeat: 3,
                stagger: {
                    grid: [rows, cols],
                    from: "random",
                    amount: 0.8
                },
                ease: "power1.inOut"
            });

            // Progress Simulation
            tl.to({}, {
                duration: 3,
                onUpdate: function () {
                    setProgress(Math.round(this.progress() * 100));
                },
                ease: "none"
            }, 0);

            // 3. Exit Sequence
            tl.to(".loader-cube", {
                scale: 0,
                opacity: 0,
                y: -30,
                duration: 0.6,
                stagger: {
                    grid: [rows, cols],
                    from: "edges",
                    amount: 0.4
                },
                ease: "back.in(1.7)"
            });

            tl.to(".preloader-content", {
                opacity: 0,
                duration: 0.3
            }, "-=0.5");

        }, comp);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className="preloader" ref={comp}>
            <div className="cube-grid-container">
                {cubes.map((c) => (
                    <div key={c} className="loader-cube"></div>
                ))}
            </div>

            <div className="preloader-content">
                <div className="preloader-title">ZYNTEX INFOSOFT</div>
                <div className="preloader-status">
                    INITIALIZING {progress}%
                </div>
            </div>
        </div>
    );
};

export default Preloader;
