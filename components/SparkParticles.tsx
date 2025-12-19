import React, { useEffect, useRef } from 'react';
import { Spark } from '../types';

interface SparkParticlesProps {
  intensity?: 'low' | 'high';
  className?: string;
}

const SparkParticles: React.FC<SparkParticlesProps> = ({ intensity = 'low', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createSpark = (): Spark => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 50, // Start slightly below
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 1.5, // Drift left/right
        speedY: Math.random() * -2 - 0.5, // Float up
        life: 0,
        maxLife: Math.random() * 100 + 100,
        color: Math.random() > 0.8 ? '#FF0033' : '#FF4500', // Red or Orange-Red
      };
    };

    const updateSparks = () => {
      // Add new sparks
      const count = intensity === 'high' ? 5 : 1;
      if (Math.random() < (intensity === 'high' ? 0.8 : 0.3)) {
        for (let i = 0; i < count; i++) {
            sparksRef.current.push(createSpark());
        }
      }

      // Update existing
      for (let i = 0; i < sparksRef.current.length; i++) {
        const p = sparksRef.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        p.size *= 0.99; // Shrink slowly

        // Add some jitter/turbulence
        p.x += (Math.random() - 0.5) * 0.5;
      }

      // Remove dead sparks
      sparksRef.current = sparksRef.current.filter((p) => p.life < p.maxLife && p.size > 0.1);
    };

    const drawSparks = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Composite operation for glow effect
      ctx.globalCompositeOperation = 'screen';

      for (const p of sparksRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = `rgba(255, 69, 0, ${alpha})`; // Orange red base
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`; 
        ctx.fill();
      }
      
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => {
      updateSparks();
      drawSparks();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className}`} 
    />
  );
};

export default SparkParticles;
