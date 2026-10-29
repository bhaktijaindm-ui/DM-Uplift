import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero3DScene
 * A performant WebGL 3D interactive floating scene using Three.js.
 * Key properties:
 * - Floating glassmorphic icosahedron core with glowing wireframe
 * - Orbiting neon-blue spheres and rings
 * - Interactive mouse parallax with smooth lerp damping
 * - Subtle floating ambient space particles
 * - Pauses rendering when off-screen to prevent CPU/GPU waste
 * - Full memory cleanup (all geometries, materials, and textures disposed)
 */
export default function Hero3DScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      1000
    );
    camera.position.z = 8;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00b4ff, 8, 30);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const deepBlueLight = new THREE.PointLight(0x2e7bff, 6, 30);
    deepBlueLight.position.set(-5, -5, 2);
    scene.add(deepBlueLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 8, -4);
    scene.add(rimLight);

    // 4. Floating 3D Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Central Glass Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1530,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    group.add(icosahedron);

    // Glowing Wireframe Cage for high-tech aesthetic
    const wireGeo = new THREE.IcosahedronGeometry(1.65, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireCage);

    // Orbiting Neon Ring
    const torusGeo = new THREE.TorusGeometry(2.5, 0.04, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00b4ff,
      emissive: 0x00b4ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    group.add(torus);

    // Floating Glass & Neon Spheres
    const spheres = [];
    const sphereMaterials = [];
    const sphereGeo = new THREE.SphereGeometry(0.24, 32, 32);

    const spherePositions = [
      { x: -2.8, y: 1.4, z: 0.8, color: 0x00b4ff },
      { x: 2.6, y: -1.2, z: 1.0, color: 0xffffff },
      { x: 1.8, y: 2.2, z: -0.5, color: 0x2e7bff },
      { x: -1.9, y: -2.0, z: -0.8, color: 0x00b4ff },
      { x: 3.2, y: 0.8, z: -1.2, color: 0x0a1530 },
    ];

    spherePositions.forEach((pos, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: pos.color,
        emissive: pos.color === 0xffffff ? 0x2e7bff : pos.color,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.5,
      });
      sphereMaterials.push(mat);
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.userData = {
        speed: 0.008 + i * 0.003,
        orbitRadius: Math.sqrt(pos.x * pos.x + pos.y * pos.y),
        angle: Math.atan2(pos.y, pos.x),
        baseZ: pos.z,
      };
      group.add(mesh);
      spheres.push(mesh);
    });

    // 5. Ambient Dust / Space Particles
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 14;
      posArray[i + 1] = (Math.random() - 0.5) * 14;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00b4ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 6. Interactive Mouse Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 8. Animation Loop with Visibility Check
    let animationFrameId = null;
    let isVisible = true;
    let startTime = performance.now();

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Group rotation with mouse influence
      group.rotation.y = elapsed * 0.2 + currentX;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.15 - currentY * 0.5;

      // Inner object spins
      icosahedron.rotation.y = elapsed * 0.3;
      icosahedron.rotation.x = elapsed * 0.2;
      wireCage.rotation.y = -elapsed * 0.15;
      wireCage.rotation.z = elapsed * 0.1;
      torus.rotation.z = elapsed * 0.25;

      // Orbiting spheres
      spheres.forEach((sp) => {
        sp.userData.angle += sp.userData.speed;
        sp.position.x = Math.cos(sp.userData.angle) * sp.userData.orbitRadius;
        sp.position.y = Math.sin(sp.userData.angle) * sp.userData.orbitRadius;
        sp.position.z =
          sp.userData.baseZ + Math.sin(elapsed * 2 + sp.userData.angle) * 0.2;
      });

      // Drifting particles
      particles.rotation.y = -elapsed * 0.03;

      renderer.render(scene, camera);
    };

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            startTime = performance.now();
            animate();
          }
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    animate();

    // 9. Comprehensive Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icoGeo.dispose();
      icoMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      sphereGeo.dispose();
      sphereMaterials.forEach((mat) => mat.dispose());
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`hero-3d-canvas-container relative w-full h-full pointer-events-auto ${className}`}
      aria-hidden="true"
    />
  );
}
