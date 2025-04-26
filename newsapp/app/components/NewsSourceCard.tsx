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
      className="bg-white shadow-sm rounded-xl p-6 border hover:shadow-md cursor-pointer transition"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{source}</h2>
      <p className="text-sm text-gray-600">
        Click to view the latest articles from {source}.
      </p>
    </div>
  );
};

export default NewsSourceCard;
