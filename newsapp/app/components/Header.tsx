"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 bg-[#F0F2F5] border-b border-[#F0F2F5] transition-all duration-300">
        <div className="w-full px-10 py-4 flex justify-between items-center">
        {/* Left: Logo + Text */}
        <Link href="/" className="flex items-center gap-3 min-w-[10rem]">
          <Image
            src={isScrolled ? "/tilted-balance.svg" : "/balance.svg"}
            alt="Balance Icon"
            width={32}
            height={32}
            className="transition-transform duration-300"
          />
          <AnimatePresence>
            {!isScrolled && (
              <motion.span
                key="logo-text"
                initial={{ opacity: 0, scaleX: 0.8, transformOrigin: "left" }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-[#1F2A44] text-3xl font-bold tracking-tight font-sans origin-left inline-block"
              >
                unbias<span className="text-[#7289AB]">.ai</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Right: Navigation + Auth */}
        <div className="flex items-center gap-8 ml-auto">
          <nav className="hidden md:flex gap-6 text-[#1F2A44] font-medium text-lg font-sans relative">
            <Link href="/news" className="hover:text-[#7289AB] transition">News</Link>
            <Link href="/compare" className="hover:text-[#7289AB] transition">Compare</Link>
            <div
              className="relative"
              onMouseEnter={() => setIsTopicsOpen(true)}
              onMouseLeave={() => setIsTopicsOpen(false)}
            >
              <button className="hover:text-[#7289AB]">Topics ▾</button>
              <AnimatePresence>
                {isTopicsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-8 left-0 w-48 bg-white border border-[#D0D3D8] text-[#1F2A44] rounded-md shadow-lg py-2 z-10"
                  >
                    {["politics", "sports", "economy", "technology"].map((t) => (
                      <Link
                        key={t}
                        href={`/topics/${t}`}
                        className="block px-4 py-2 hover:bg-[#F0F2F5]"
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/about" className="hover:text-[#7289AB] transition">About</Link>
          </nav>

          {session ? (
            <div className="flex items-center gap-2">
              <span className="text-[#1F2A44] font-medium">
                {session.user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-[#7289AB] hover:text-[#1F2A44] transition underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-[#7289AB] hover:bg-[#6078A0] text-white px-4 py-2 rounded-md font-semibold shadow transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
