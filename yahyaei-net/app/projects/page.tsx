'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock, Star } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

type Project = {
  title: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  stars: number;
  updatedAt: string;
};

const projects: Project[] = [
  {
    title: 'Rivals Log',
    tech: ['Next.js', 'TypeScript', 'Three.js', 'Prisma', 'Tailwind CSS'],
    repoUrl: 'https://github.com/KomedyKid/Rivals-Log',
    liveUrl: 'https://rivalslog.com',
    stars: 1,
    updatedAt: '2025-10-30T00:30:09Z',
  },
  {
    title: 'Flight Tracker',
    tech: ['Java', 'Swing', 'Data Structures', 'File I/O'],
    repoUrl: 'https://github.com/KomedyKid/Flight-Tracker',
    stars: 0,
    updatedAt: '2025-10-28T16:00:55Z',
  },
  {
    title: 'Deepfake Detector',
    tech: ['Python', 'TensorFlow', 'Flask', 'Computer Vision'],
    repoUrl: 'https://github.com/KomedyKid/deepfake-detector',
    stars: 0,
    updatedAt: '2024-10-23T11:53:26Z',
  },
];

const formatUpdatedAt = (isoString: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoString));

export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-16 pt-28 sm:px-10">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-blue-400 sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            A growing collection of the things I&apos;ve been building lately.
            Each project combines thoughtful design with a focus on user
            experience and performance.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-5xl gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 p-6 shadow-lg shadow-black/40 transition-transform duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-blue-900/40"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-300">
                    {project.title}
                  </h2>
                </div>
                <div className="inline-flex min-w-[72px] items-center justify-end gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  <Star className="h-3.5 w-3.5" />
                  {project.stars}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-wide text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
                  <Clock className="h-4 w-4 text-blue-300" />
                  Updated {formatUpdatedAt(project.updatedAt)}
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 px-4 py-2 text-sm font-semibold text-blue-300 transition-colors hover:border-blue-400 hover:text-white"
                    >
                      Live preview
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-blue-400 hover:text-white"
                  >
                    View on GitHub
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_45%)]" />
    </div>
  );
}
