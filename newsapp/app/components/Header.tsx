"use client";
import Link from "next/link";
import React, { useState } from "react";
import SearchBox from "./SearchBox";

const Header: React.FC = () => {
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur bg-gray-50/90 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-montserrat hover:text-gray-600 transition">
          <img src="/unbiastemplogo.png" alt="Unbias Logo" className="h-14 w-14 object-contain" />
          <div>
            <span className="text-gray-800">Unbias</span><span className="text-blue-700">.ai</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10 text-lg font-montserrat text-gray-700 relative">
          <Link href="/news" className="hover:text-blue-900 transition">News</Link>
          <Link href="/compare" className="hover:text-blue-900 transition">Compare</Link>
          {/* Topics Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsTopicsOpen(true)}
            onMouseLeave={() => setIsTopicsOpen(false)}
          >
            <button className="hover:text-blue-900 transition">Topics ▾</button>
            {isTopicsOpen && (
              <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg rounded-md py-2 w-48 text-gray-700">
                <Link href="/topics/politics" className="block px-4 py-2 hover:bg-gray-100">Politics</Link>
                <Link href="/topics/sports" className="block px-4 py-2 hover:bg-gray-100">Sports</Link>
                <Link href="/topics/economy" className="block px-4 py-2 hover:bg-gray-100">Economy</Link>
                <Link href="/topics/technology" className="block px-4 py-2 hover:bg-gray-100">Technology</Link>
              </div>
            )}
          </div>
          <Link href="/about" className="hover:text-blue-900 transition">About</Link>
        </nav>

        {/* Search */}
        <div>
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default Header;
