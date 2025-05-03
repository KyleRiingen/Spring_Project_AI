"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface NavHoverCardProps {
  title: string;
  links: { label: string; href: string }[];
  extraLinks?: { label: string; href: string; external?: boolean }[];
  image?: { src: string; alt: string; title?: string; subtitle?: string };
}

const NavHoverCard: React.FC<NavHoverCardProps> = ({
  title,
  links,
  extraLinks = [],
  image,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute top-8 left-0 bg-white rounded-xl border border-[#D0D3D8] shadow-xl flex w-[480px] overflow-hidden z-50"
    >
      {/* Left - Links */}
      <div className="flex-1 p-4">
        <p className="text-sm font-bold text-[#1F2A44] mb-2">{title}</p>
        <ul className="space-y-2 text-sm text-[#1F2A44]">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {extraLinks.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-[#1F2A44]/80">
            {extraLinks.map((link) => (
              <li key={link.href} className="flex items-center gap-1">
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  className="hover:underline flex items-center gap-1"
                >
                  {link.label}
                  {link.external && (
                    <span className="text-xs">↗</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right - Image Section */}
      {image && (
        <div className="bg-[#e57f5b] text-white p-4 flex flex-col justify-end items-start w-48">
          <Image
            src={image.src}
            alt={image.alt}
            width={160}
            height={160}
            className="mb-2"
          />
          {image.title && (
            <>
              <p className="text-xs uppercase font-semibold text-white/70 mb-1">
                {image.subtitle || "News"}
              </p>
              <p className="text-sm font-bold">{image.title}</p>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default NavHoverCard;
