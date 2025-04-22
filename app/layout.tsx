import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Commentator - Football Commentary Platform",
  description: "Enjoy football matches with alternative commentary from your favorite commentators. Watch on any streaming platform while listening to alternative commentators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-blue-900 to-black text-white`}
      >
        <header className="border-b border-blue-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Commentator
            </Link>
            <div className="flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/watch" className="hover:text-blue-400">
                      Watch
                    </Link>
                  </li>
                  <li>
                    <Link href="/record" className="hover:text-blue-400">
                      Record
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* Auth button will be added client-side */}
              <div id="auth-button-container"></div>
            </div>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="mt-20 pt-8 border-t border-blue-700 text-center">
          <div className="container mx-auto px-4 py-6">
            <p>© {new Date().getFullYear()} Commentator - Enhance your football watching experience</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
