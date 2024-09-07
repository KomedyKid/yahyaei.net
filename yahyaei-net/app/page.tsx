export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          yahyaei.net
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Coming Soon
        </p>
        <div className="w-16 h-1 bg-blue-500 my-4"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
          We&apos;re working on something exciting. Stay tuned for updates!
        </p>
      </main>
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} yahyaei.net. All rights reserved.</p>
      </footer>
    </div>
  );
}