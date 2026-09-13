import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface ParticleSystemRef {
  triggerExplosion: (x: number, y: number, color: string) => void;
}

interface ParticleSystemProps {
  className?: string;
}

export const ParticleSystem = forwardRef<ParticleSystemRef, ParticleSystemProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useImperativeHandle(ref, () => ({
    triggerExplosion: (xNorm: number, yNorm: number, color: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = xNorm * rect.width;
      const y = yNorm * rect.height;

      const pCount = 20 + Math.random() * 10;
      for (let i = 0; i < pCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50; // pixels per second loosely
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 1,
          color,
          size: Math.random() * 4 + 2
        });
      }
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      const width = rect.width * dpr;
      const height = rect.height * dpr;

      if (width <= 0 || height <= 0) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        ctx.scale(dpr, dpr);
      } else {
        ctx.clearRect(0, 0, rect.width, rect.height);
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt * (Math.random() * 1 + 0.5);
        
        p.vy += 200 * dt; // gravity
        p.vx *= 0.95; // friction
        p.vy *= 0.95;
        
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className={props.className || "absolute inset-0 w-full h-full pointer-events-none z-[100]"}
    />
  );
});
ParticleSystem.displayName = 'ParticleSystem';
