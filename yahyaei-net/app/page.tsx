'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const stars = document.getElementById('stars');
    if (stars) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        stars.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-900 overflow-hidden">
      <div id="stars" className="absolute inset-0"></div>
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