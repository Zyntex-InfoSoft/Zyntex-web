import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import video from "../assets/videos/zyntex1.mp4";

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let ctx = gsap.context(() => {
      // Set initial opacity
      gsap.set(videoEl, { opacity: 0.3 });

      const handleScroll = () => {
        const contactSection = document.getElementById("footer"); // Assuming footer as contact area or similar
        // If contact section logic is needed, we can add it here.
        // For now, mirroring the logic to fade out/in based on position if needed,
        // or just keep it simple as background.

        // The original logic checked for 'contact' section.
        // Let's replicate a simple fade on scroll if desired, or keep constant.
        // Previous logic: fade to 0.1 over contact section.

        const contact = document.getElementById("contact") || document.getElementById("footer");
        if (contact) {
          const contactTop = contact.offsetTop;
          const scrollPosition = window.scrollY + window.innerHeight / 2;
          if (scrollPosition >= contactTop) {
            gsap.to(videoEl, { opacity: 0.1, duration: 0.5 });
          } else {
            gsap.to(videoEl, { opacity: 0.3, duration: 0.5 });
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, videoRef);

    return () => ctx.revert();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      id="bg-video"
    >
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default BackgroundVideo;
