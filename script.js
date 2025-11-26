import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.PlaneGeometry(12, 6, 200, 200);

// Shader Material
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    color1: { value: new THREE.Color("#020515") },   // dark navy
    color2: { value: new THREE.Color("#00c6ff") },   // cyan glow
  },
  vertexShader: `
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;

      vec3 pos = position;
      pos.z += sin(pos.x * 3.0 + time * 2.0) * 0.15;
      pos.z += cos(pos.y * 5.0 + time * 1.5) * 0.2;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 color1;
    uniform vec3 color2;

    void main() {
      // gradient blend from dark navy to cyan glow
      vec3 gradient = mix(color1, color2, vUv.y * 0.8);

      // glow intensity
      float glow = pow(1.0 - abs(vUv.y - 0.5), 3.0);
      gradient += glow * 0.2;

      gl_FragColor = vec4(gradient, 1.0);
    }
  `,
  wireframe: false,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation
function animate() {
  requestAnimationFrame(animate);
  material.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
