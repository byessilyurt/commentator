"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Commentator</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          Enjoy football matches with commentaries from your favorite commentators.
          Record your own commentary or listen to others while watching matches.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-blue-800 bg-opacity-40 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Watch with Custom Commentary</h2>
            <p className="mb-6">
              Choose from a variety of commentators while watching your football matches.
              Our system syncs perfectly with your video.
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
              <h3 className="text-xl font-semibold mb-2">Select a Match</h3>
              <p>Choose from live or recorded football matches</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-3">2</div>
              <h3 className="text-xl font-semibold mb-2">Pick a Commentator</h3>
              <p>Browse commentaries or record your own</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-3">3</div>
              <h3 className="text-xl font-semibold mb-2">Enjoy the Match</h3>
              <p>Watch with your chosen commentary, perfectly synchronized</p>
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
