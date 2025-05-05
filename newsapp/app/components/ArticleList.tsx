"use client";
import React, { useMemo, useState } from "react";
import { useArticles } from "../hooks/useArticles";
import DisplayArticle from "./DisplayArticle";

interface ArticleListProps {
  source: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ source }) => {
  const memoizedSources = useMemo(() => [source], [source]);
  const { news1, loading, error } = useArticles(memoizedSources);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* 📝 List of Titles */}
      <div className="lg:w-1/3 bg-white border border-[#D0D3D8] rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-[#1F2A44] px-6 py-4 border-b">
          {source}
        </h2>

        <div className="h-[600px] overflow-y-auto px-4 pb-4 space-y-2">
          {loading && <p className="text-gray-500">Loading articles...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {news1.map((article, index) => (
            <button
              key={index}
              onClick={() => setSelectedTitle(article.articleName)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${
                selectedTitle === article.articleName
                  ? "bg-[#E6E4F0] text-[#1F2A44] font-semibold"
                  : "hover:bg-[#F5F6F8] text-[#4C5760]"
              }`}
            >
              {article.articleName}
            </button>
          ))}
        </div>
      </div>

      {/* 📄 Selected Article Display */}
      <div className="lg:w-2/3">
        {selectedTitle && (
          <DisplayArticle source={source} title={selectedTitle} />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
