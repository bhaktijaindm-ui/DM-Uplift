import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero3DScene
 * A borderless, unconstrained WebGL 3D interactive floating scene using Three.js.
 * Key properties:
 * - Free 360-degree rotation with smooth continuous spin + drag-to-spin interactivity
 * - Glassmorphic icosahedron core with glowing electric cyan wireframe cage
 * - Dual orbiting neon rings for a cosmic gyroscopic aesthetic
 * - 12 dynamic glowing spheres ("balls") orbiting and roaming far and wide
 * - Interactive pointer drag + mouse parallax damping
 * - Performance-optimized with visibility observer and full resource disposal
 */
export default function Hero3DScene({ className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / (container.clientHeight || 1),
      0.1,
      1000
    );
    camera.position.z = 10.0;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Explicit style reset to guarantee zero borders, backgrounds, or clipping
    renderer.domElement.style.outline = "none";
    renderer.domElement.style.border = "none";
    renderer.domElement.style.background = "transparent";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.overflow = "visible";

    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00b4ff, 9, 35);
    blueLight.position.set(6, 6, 6);
    scene.add(blueLight);

    const deepBlueLight = new THREE.PointLight(0x2e7bff, 7, 35);
    deepBlueLight.position.set(-6, -5, 4);
    scene.add(deepBlueLight);

    const movingLight = new THREE.PointLight(0x38bdf8, 5, 25);
    movingLight.position.set(0, 0, 4);
    scene.add(movingLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.8);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // 4. Floating 3D Objects Main Group
    const group = new THREE.Group();
    scene.add(group);

    // Central Glass Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.65, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x071129,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.88,
      thickness: 1.4,
      ior: 1.52,
      reflectivity: 0.95,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      wireframe: false,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    group.add(icosahedron);

    // Glowing Wireframe Cage for high-tech aesthetic
    const wireGeo = new THREE.IcosahedronGeometry(1.72, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00b4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireCage);

    // Primary Orbiting Neon Ring
    const torusGeo1 = new THREE.TorusGeometry(2.7, 0.035, 16, 120);
    const torusMat1 = new THREE.MeshStandardMaterial({
      color: 0x00b4ff,
      emissive: 0x00b4ff,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const torus1 = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.rotation.x = Math.PI / 3;
    group.add(torus1);

    // Secondary Transverse Gyro Ring
    const torusGeo2 = new THREE.TorusGeometry(3.3, 0.025, 16, 120);
    const torusMat2 = new THREE.MeshStandardMaterial({
      color: 0x2e7bff,
      emissive: 0x2e7bff,
      emissiveIntensity: 0.5,
      roughness: 0.25,
      metalness: 0.7,
      transparent: true,
      opacity: 0.8,
    });
    const torus2 = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.y = Math.PI / 4;
    torus2.rotation.z = Math.PI / 6;
    group.add(torus2);

    // 5. Constellation of 12 Floating Spheres ("बॉल्स") that Roam Far & Wide
    const spheres = [];
    const sphereMaterials = [];
    const sphereGeoSmall = new THREE.SphereGeometry(0.18, 32, 32);
    const sphereGeoMedium = new THREE.SphereGeometry(0.26, 32, 32);
    const sphereGeoLarge = new THREE.SphereGeometry(0.34, 32, 32);

    const sphereConfigs = [
      // Close orbiters
      { radius: 2.3, speed: 0.016, incX: 0.2, incZ: 0.3, size: "small", color: 0x00b4ff, emissive: 0x00b4ff, ampZ: 0.4 },
      { radius: 2.6, speed: -0.014, incX: -0.4, incZ: 0.2, size: "medium", color: 0xffffff, emissive: 0x38bdf8, ampZ: 0.6 },
      { radius: 2.9, speed: 0.012, incX: 0.5, incZ: -0.3, size: "small", color: 0x2e7bff, emissive: 0x2e7bff, ampZ: 0.5 },
      // Mid-range orbiters
      { radius: 3.4, speed: -0.011, incX: -0.6, incZ: 0.4, size: "large", color: 0x00b4ff, emissive: 0x00b4ff, ampZ: 0.8 },
      { radius: 3.8, speed: 0.009, incX: 0.3, incZ: 0.6, size: "medium", color: 0xffffff, emissive: 0x2e7bff, ampZ: 0.9 },
      { radius: 4.1, speed: -0.008, incX: -0.2, incZ: -0.5, size: "small", color: 0x38bdf8, emissive: 0x00b4ff, ampZ: 0.7 },
      // Wide outer roamers (travel far and wide across the scene)
      { radius: 4.6, speed: 0.007, incX: 0.7, incZ: 0.1, size: "large", color: 0x2e7bff, emissive: 0x00b4ff, ampZ: 1.2 },
      { radius: 5.0, speed: -0.006, incX: -0.5, incZ: 0.7, size: "medium", color: 0x00b4ff, emissive: 0x38bdf8, ampZ: 1.4 },
      { radius: 5.4, speed: 0.005, incX: 0.4, incZ: -0.6, size: "small", color: 0xffffff, emissive: 0xffffff, ampZ: 1.5 },
      { radius: 4.8, speed: -0.007, incX: -0.8, incZ: -0.2, size: "medium", color: 0x2e7bff, emissive: 0x2e7bff, ampZ: 1.1 },
      { radius: 5.6, speed: 0.006, incX: 0.3, incZ: 0.8, size: "small", color: 0x38bdf8, emissive: 0x00b4ff, ampZ: 1.6 },
      { radius: 3.6, speed: 0.013, incX: -0.3, incZ: -0.4, size: "medium", color: 0x00b4ff, emissive: 0x2e7bff, ampZ: 0.8 },
    ];

    sphereConfigs.forEach((cfg, i) => {
      const geo =
        cfg.size === "small"
          ? sphereGeoSmall
          : cfg.size === "large"
          ? sphereGeoLarge
          : sphereGeoMedium;

      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.emissive,
        emissiveIntensity: 0.65,
        roughness: 0.15,
        metalness: 0.6,
      });
      sphereMaterials.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / sphereConfigs.length) * Math.PI * 2;
      mesh.userData = {
        baseRadius: cfg.radius,
        speed: cfg.speed,
        angle: angle,
        incX: cfg.incX,
        incZ: cfg.incZ,
        ampZ: cfg.ampZ,
        cosIncX: Math.cos(cfg.incX),
        sinIncX: Math.sin(cfg.incX),
        cosIncZ: Math.cos(cfg.incZ),
        sinIncZ: Math.sin(cfg.incZ),
        pulseSpeed: 1.2 + (i % 3) * 0.4,
        phase: i * 0.8,
      };

      group.add(mesh);
      spheres.push(mesh);
    });

    // 6. Ambient Dust / Space Particles
    const particlesCount = 140;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 18;
      posArray[i + 1] = (Math.random() - 0.5) * 18;
      posArray[i + 2] = (Math.random() - 0.5) * 14;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x00b4ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // 7. Interactive Free Rotation: Pointer Drag & Mouse Tracking
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;

        // Apply direct rotation during drag
        group.rotation.y += deltaX * 0.008;
        group.rotation.x += deltaY * 0.008;

        // Store velocity for smooth inertia release
        dragVelocityX = deltaX * 0.008;
        dragVelocityY = deltaY * 0.008;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    // Global ambient mouse parallax across the window
    const onWindowMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetParallaxX = x * 0.45;
      targetParallaxY = y * 0.35;
    };

    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("mousemove", onWindowMouseMove, { passive: true });

    // 8. Resize handling
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

    // 9. Full 360-Degree Animation Loop
    let animationFrameId = null;
    let isVisible = true;
    let startTime = performance.now();

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Parallax lerp
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.04;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.04;

      // Smooth inertia decay when not actively dragging
      if (!isDragging) {
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        group.rotation.y += dragVelocityX;
        group.rotation.x += dragVelocityY;
      }

      // Continuous full 360-degree rotation ("पूरी तरीके से अच्छे से रोटेट होना चाहिए")
      group.rotation.y += 0.006;
      group.rotation.x = Math.sin(elapsed * 0.4) * 0.12 + currentParallaxY;
      group.rotation.z = Math.cos(elapsed * 0.3) * 0.06;

      // Inner objects independent gyroscopic spins
      icosahedron.rotation.y = elapsed * 0.28;
      icosahedron.rotation.x = elapsed * 0.18;
      wireCage.rotation.y = -elapsed * 0.16;
      wireCage.rotation.z = elapsed * 0.12;

      // Torus rings counter-orbit
      torus1.rotation.z = elapsed * 0.22;
      torus2.rotation.x = elapsed * 0.16;
      torus2.rotation.y = -elapsed * 0.19;

      // Orbiting dynamic point light
      movingLight.position.x = Math.sin(elapsed * 1.5) * 4;
      movingLight.position.y = Math.cos(elapsed * 1.2) * 3;

      // Floating spheres trajectory calculation ("उसकी बॉल्स इधर-उधर सब दूर जा सकती है")
      spheres.forEach((sp) => {
        const u = sp.userData;
        u.angle += u.speed;

        // Dynamic radial breathing allows spheres to reach far and wide
        const dynamicRadius =
          u.baseRadius + Math.sin(elapsed * u.pulseSpeed + u.phase) * 0.5;

        // Raw 2D orbital coordinates
        const rawX = Math.cos(u.angle) * dynamicRadius;
        const rawY = Math.sin(u.angle) * dynamicRadius;
        const rawZ = Math.sin(u.angle * 2 + u.phase) * u.ampZ;

        // Apply 3D plane rotation
        sp.position.x = rawX * u.cosIncZ - rawY * u.sinIncZ;
        sp.position.y =
          (rawX * u.sinIncZ + rawY * u.cosIncZ) * u.cosIncX -
          rawZ * u.sinIncX;
        sp.position.z =
          (rawX * u.sinIncZ + rawY * u.cosIncZ) * u.sinIncX +
          rawZ * u.cosIncX;

        // Subtle self-rotation
        sp.rotation.y += 0.02;
        sp.rotation.x += 0.01;
      });

      // Ambient drift for stars/dust
      particles.rotation.y = -elapsed * 0.025;
      particles.rotation.x = elapsed * 0.015;

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

    // 10. Comprehensive Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("mousemove", onWindowMouseMove);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icoGeo.dispose();
      icoMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo1.dispose();
      torusMat1.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      sphereGeoSmall.dispose();
      sphereGeoMedium.dispose();
      sphereGeoLarge.dispose();
      sphereMaterials.forEach((mat) => mat.dispose());
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`hero-3d-canvas-container relative w-full h-full cursor-grab active:cursor-grabbing select-none pointer-events-auto overflow-visible ${className}`}
      aria-label="Interactive 3D rotating polyhedron with orbiting glowing spheres"
    />
  );
}
