import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">yahyaei.net</h1>
        <h2 className="text-2xl mb-8">Coming Soon</h2>
        <p className="text-lg mb-8">We're working on something exciting. Stay tuned!</p>
        <div className="flex justify-center space-x-4">
          {/* Add your social media links here */}
          <a href="#" className="text-blue-600 hover:underline">Twitter</a>
          <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
          <a href="#" className="text-blue-600 hover:underline">GitHub</a>
        </div>
      </main>
      <footer className="mt-16 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} yahyaei.net. All rights reserved.
      </footer>
    </div>
  );
}
