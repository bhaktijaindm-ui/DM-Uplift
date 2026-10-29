import React, { useRef, useEffect, useState } from 'react';
import './SolarSystem.css';

export const SolarSystem = () => {
  const canvasRef = useRef(null);
  const [planets, setPlanets] = useState([
    { name: 'Mercury', color: '#8C7853', size: 4, distance: 80, speed: 0.008, angle: 0 },
    { name: 'Venus', color: '#FFC649', size: 6, distance: 120, speed: 0.006, angle: Math.PI / 4 },
    { name: 'Earth', color: '#4A90E2', size: 6, distance: 160, speed: 0.004, angle: Math.PI },
    { name: 'Mars', color: '#E27B58', size: 5, distance: 200, speed: 0.003, angle: Math.PI * 1.5 },
    { name: 'Jupiter', color: '#C88B3A', size: 14, distance: 280, speed: 0.002, angle: Math.PI / 2 },
    { name: 'Saturn', color: '#FAD5A5', size: 12, distance: 360, speed: 0.0015, angle: Math.PI * 1.2 },
    { name: 'Uranus', color: '#4FD0E7', size: 8, distance: 440, speed: 0.001, angle: Math.PI * 0.7 },
    { name: 'Neptune', color: '#4166F5', size: 8, distance: 520, speed: 0.0008, angle: Math.PI * 1.8 },
  ]);
  const animationRef = useRef();

  const drawSolarSystem = (ctx, width, height, currentPlanets) => {
    // Shift center to the right for desktop so it doesn't overlap text
    const isMobile = width < 768;
    const centerX = isMobile ? width / 2 : width * 0.75;
    const centerY = isMobile ? height * 0.65 : height / 2;

    ctx.clearRect(0, 0, width, height);

    // Add global opacity fade towards the edges
    const fadeGradient = ctx.createRadialGradient(centerX, centerY, 100, centerX, centerY, Math.max(width, height) / 1.5);
    fadeGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    fadeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.globalCompositeOperation = 'destination-out';
    // We do this by applying the fade at the end? No, it's easier to just use CSS masking for the fading edges.

    ctx.globalCompositeOperation = 'source-over';

    // Draw Sun
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
    sunGradient.addColorStop(0, '#fff');
    sunGradient.addColorStop(0.2, '#d4af37');
    sunGradient.addColorStop(0.5, '#b8860b');
    sunGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
    ctx.fill();
    
    // Core Sun
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Draw sun glow
    ctx.shadowBlur = 80;
    ctx.shadowColor = '#d4af37';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw orbits and planets
    currentPlanets.forEach((planet) => {
      // Draw orbit
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.distance, 0, Math.PI * 2);
      ctx.stroke();

      // Calculate planet position
      const x = centerX + Math.cos(planet.angle) * planet.distance;
      const y = centerY + Math.sin(planet.angle) * planet.distance;

      // Draw planet
      const planetGradient = ctx.createRadialGradient(x - planet.size / 3, y - planet.size / 3, 0, x, y, planet.size);
      planetGradient.addColorStop(0, planet.color);
      planetGradient.addColorStop(1, '#000000');
      ctx.fillStyle = planetGradient;
      ctx.beginPath();
      ctx.arc(x, y, planet.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw planet name
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(planet.name, x, y + planet.size + 15);

      // Draw Saturn's rings
      if (planet.name === 'Saturn') {
        ctx.strokeStyle = 'rgba(250, 213, 165, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(x, y, planet.size * 1.8, planet.size * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setPlanets((prevPlanets) => {
      const updatedPlanets = prevPlanets.map((planet) => ({
        ...planet,
        angle: planet.angle + planet.speed,
      }));

      drawSolarSystem(ctx, canvas.width, canvas.height, updatedPlanets);
      return updatedPlanets;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="solar-system-container">
      <canvas ref={canvasRef} className="solar-system-canvas" />
    </div>
  );
};
