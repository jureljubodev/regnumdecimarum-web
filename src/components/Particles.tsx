import React, { useEffect, useRef } from 'react';
import styles from './Particles.module.css';

interface ParticlesProps {
  particleCount?: number;
  particleSize?: number;
  speed?: number;
  mouseRadius?: number;
  connectionDistance?: number;
}

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 20,
  particleSize = 2,
  speed = 0.4,
  mouseRadius = 150,
  connectionDistance = 90
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const frameTickRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    baseOpacity: number;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isSmallScreen = window.matchMedia('(max-width: 760px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPowerMode = isSmallScreen || reduceMotion;
    const mouseRadiusSquared = mouseRadius * mouseRadius;
    const connectionDistanceSquared = connectionDistance * connectionDistance;

    const resizeCanvas = () => {
      // Only cover hero section area, not full viewport
      const heroSection = document.querySelector('#home');
      const pixelRatio = isLowPowerMode ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
        canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
      } else {
        canvas.width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
        canvas.height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: particleSize + Math.random() * (isLowPowerMode ? 1 : 1.5), // Keep size variation but lighter on low power
          opacity: Math.random() * 0.3 + 0.1,
          baseOpacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - more noticeable
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;

        if (!isLowPowerMode && distanceSquared < mouseRadiusSquared) {
          const distance = Math.sqrt(distanceSquared) || 1;
          const force = (mouseRadius - distance) / mouseRadius;
          particle.opacity = Math.min(0.9, particle.baseOpacity + force * 0.8); // More visible reaction
          // Add slight attraction to mouse
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        } else {
          particle.opacity = Math.max(particle.baseOpacity, particle.opacity - 0.02); // Slower fade out
        }
      });
    };

    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < connectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            // Calculate opacity based on distance (closer = more opaque)
            const opacity = (1 - distance / connectionDistance) * (isLowPowerMode ? 0.2 : 0.3);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = isLowPowerMode ? 0.4 : 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind particles)
      drawConnections();

      // Draw particles on top
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      if (isLowPowerMode) {
        frameTickRef.current = (frameTickRef.current + 1) % 2;
        if (frameTickRef.current === 1) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }

      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const heroSection = document.querySelector('#home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      } else {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    if (!isLowPowerMode) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, particleSize, speed, mouseRadius, connectionDistance]);

  return (
    <canvas ref={canvasRef} className={styles.particles} />
  );
};

export default Particles;