"use client";
import React from "react";

interface NewsSourceCardProps {
  source: string;
  onClick: (source: string) => void;
}

const NewsSourceCard: React.FC<NewsSourceCardProps> = ({ source, onClick }) => {
  return (
    <div
      onClick={() => onClick(source)}
      className="bg-white border border-[#D0D3D8] rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition"
    >
      <h2 className="text-xl font-bold text-[#1F2A44] mb-2">{source}</h2>
      <p className="text-sm text-[#4C5760]">
        Click to view the latest articles from {source}.
      </p>
    </div>
  );
};

export default NewsSourceCard;
