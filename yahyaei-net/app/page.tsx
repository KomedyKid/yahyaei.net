'use client';
import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const particles: Particle[] = [];
    const particleCount = 100;
    let mouseX = 0;
    let mouseY = 0;

    canvas.width = width;
    canvas.height = height;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx!.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }

      update() {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx/10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy/10;
          }
        }
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('mousemove', (e) => {
      mouseX = e.x;
      mouseY = e.y;
    });

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    });

  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      <main className="relative flex flex-col gap-8 items-center z-10">
        <h1 className="text-6xl font-bold text-blue-400 animate-pulse">
          yahyaei.net
        </h1>
        <p className="text-2xl text-gray-300 animate-fade-in-up">
          Coming Soon
        </p>
        <div className="w-24 h-1 bg-blue-500 my-4 animate-expand"></div>
        <p className="text-sm text-gray-400 max-w-md animate-fade-in">
          We&apos;re crafting something extraordinary. Prepare for launch!
        </p>
      </main>
      <footer className="relative mt-16 text-sm text-gray-500 z-10">
        <p>© {new Date().getFullYear()} yahyaei.net. All rights reserved.</p>
      </footer>
    </div>
  );
}