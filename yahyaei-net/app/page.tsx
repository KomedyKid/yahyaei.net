'use client';
import { useEffect, useRef, type SVGProps } from 'react';
import { Github } from 'lucide-react';
import { Navbar } from '../components/Navbar';

const LinkedInLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M100.3 448H7.4V148.9h92.9zm-46.4-338A53.7 53.7 0 010 56.3 53.7 53.7 0 0153.9 0 53.7 53.7 0 01107.8 56.3a53.7 53.7 0 01-54 53.7zM447.9 448h-92.7V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.8 37.7-55.8 76.7V448h-92.7V148.9h88.9v40.8h1.3c12.4-23.5 42.6-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3z"
    />
  </svg>
);

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

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
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
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push(new Particle(x, y));
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
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
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-900 overflow-hidden animate-fade-smooth">
      <Navbar />
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      <main className="relative flex flex-col gap-8 items-center z-10">
        <h1 className="text-6xl font-bold text-blue-400 animate-pulse">
          yahyaei.net
        </h1>
        <p className="text-2xl text-gray-300 animate-fade-in-up">
          Soon to be amazing
        </p>
        <div className="w-24 h-1 bg-blue-500 my-4 animate-expand"></div>
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
          <a
            href="https://www.linkedin.com/in/salimyahyaei/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-14 w-14 items-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-blue-900/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:w-60 focus-visible:-translate-y-1 focus-visible:shadow-2xl focus-visible:w-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            <span className="flex h-full w-14 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <LinkedInLogo className="h-6 w-6" />
            </span>
            <span className="max-w-0 whitespace-nowrap text-base font-semibold opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-xs group-focus-visible:opacity-100">
              Connect on LinkedIn
            </span>
          </a>
          <a
            href="https://github.com/KomedyKid"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-14 w-14 items-center overflow-hidden rounded-full border border-gray-700 bg-gray-900/60 text-gray-200 shadow-lg shadow-black/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-400 hover:bg-gray-800 hover:w-60 focus-visible:-translate-y-1 focus-visible:border-gray-400 focus-visible:bg-gray-800 focus-visible:shadow-2xl focus-visible:w-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60"
          >
            <span className="flex h-full w-14 flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <Github className="h-6 w-6" />
            </span>
            <span className="max-w-0 whitespace-nowrap text-base font-semibold opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-xs group-hover:opacity-100 group-focus-visible:ml-3 group-focus-visible:max-w-xs group-focus-visible:opacity-100">
              Explore GitHub
            </span>
          </a>
        </div>
      </main>
      <footer className="relative mt-16 text-sm text-gray-500 z-10">
        <p>© {new Date().getFullYear()} yahyaei.net. All rights reserved.</p>
      </footer>
    </div>
  );
}
