"use client";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-montserrat font-semibold text-gray-900 tracking-tight">
            Unbias.ai
          </span>
        </Link>

        <nav className="flex gap-6 text-sm font-montserrat text-gray-700">
          <Link href="/news" className="hover:text-blue-600 transition">News</Link>
          <Link href="/compare" className="hover:text-blue-600 transition">Compare</Link>
          <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;