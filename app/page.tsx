"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Commentator</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Enjoy football matches with commentary from your favorite commentators.
          Watch on any streaming platform while listening to alternative commentators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-blue-800 bg-opacity-40 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Watch with Custom Commentary</h2>
            <p className="mb-6">
              Mute your original stream and listen to our commentators instead.
              Our synchronization tools help you match our audio perfectly with your video.
            </p>
            <Link
              href="/watch"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Watch Now
            </Link>
          </div>

          <div className="bg-blue-800 bg-opacity-40 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Record Your Commentary</h2>
            <p className="mb-6">
              Become a commentator! Record your commentary for matches and share with the community.
              Our tools help you include time markers for easy synchronization.
            </p>
            <Link
              href="/record"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Start Recording
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-3">1</div>
              <h3 className="text-xl font-semibold mb-2">Watch Your Match</h3>
              <p>Play your football match on any streaming service and mute the original commentary</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-3">2</div>
              <h3 className="text-xl font-semibold mb-2">Pick a Commentator</h3>
              <p>Browse available commentaries and select your favorite commentator</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-3">3</div>
              <h3 className="text-xl font-semibold mb-2">Sync & Enjoy</h3>
              <p>Use our sync tools to match the commentary with your video stream</p>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gray-800 bg-opacity-30 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Use Commentator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex space-x-4">
              <div className="text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Works with Any Stream</h3>
                <p className="text-gray-300">Use with any football streaming service or recording</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Community Commentators</h3>
                <p className="text-gray-300">Find passionate fans and professional commentators</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Easy Synchronization</h3>
                <p className="text-gray-300">Simple tools to match commentary with your video</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Be a Commentator</h3>
                <p className="text-gray-300">Record and share your own commentary with others</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-blue-700 text-center">
          <p>© {new Date().getFullYear()} Commentator - Enhance your football watching experience</p>
        </footer>
      </div>
    </main>
  );
}
