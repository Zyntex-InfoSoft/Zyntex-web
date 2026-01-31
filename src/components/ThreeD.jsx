import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeD = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      500
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Optimized renderer settings - HD quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, // Keep antialiasing for HD
      alpha: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // HD pixel ratio
    renderer.setClearColor(0x0a0a0a, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better quality
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Simplified lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Single green light for monitors
    const greenLight = new THREE.PointLight(0x00ff88, 2, 20);
    greenLight.position.set(0, 3, 2);
    scene.add(greenLight);

    // Purple accent light
    const purpleLight = new THREE.PointLight(0x8b5cf6, 1.2, 25);
    purpleLight.position.set(0, 5, -5);
    scene.add(purpleLight);

    // Load the GLB model
    const loader = new GLTFLoader();
    let model = null;

    loader.load(
      '/models/old_computers.glb',
      (gltf) => {
        model = gltf.scene;
        
        // Scale and position the model
        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, -1, 0);
        
        // Optimize materials - disable shadows for performance
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.frustumCulled = true;
            // Simplify materials
            if (child.material) {
              child.material.precision = 'lowp';
            }
          }
        });
        
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Optimized animation loop with frame limiting
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime) => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Skip rendering if not visible
      if (!isVisibleRef.current) return;``
      
      // Frame rate limiting
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      // Subtle camera movement based on mouse (simplified)
      camera.position.x += (mouseRef.current.x * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (mouseRef.current.y * 0.8 + 2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate(0);

    // Throttled mouse interaction
    let mouseMoveTimeout;
    const onMouseMove = (event) => {
      if (mouseMoveTimeout) return;
      mouseMoveTimeout = setTimeout(() => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouseMoveTimeout = null;
      }, 50);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Visibility observer - pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(mouseMoveTimeout);
      clearTimeout(resizeTimeout);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ThreeD;
