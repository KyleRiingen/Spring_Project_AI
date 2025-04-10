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
    <div className="mt-8 flex flex-col lg:flex-row gap-6"> {/* this is the magic line */}

      {/* Article titles (left panel) */}
      <div className="lg:w-1/3">
        <h2 className="text-2xl font-bold font-montserrat mb-4">{source}</h2>

        {loading && <p className="text-gray-500">Loading articles...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="flex flex-col gap-2">
          {news1.map((article, index) => (
            <button
              key={index}
              onClick={() => setSelectedTitle(article.titles)}
              className={`text-left hover:underline font-medium ${
                selectedTitle === article.titles ? "text-blue-800 font-semibold" : "text-blue-600"
              }`}
            >
              {article.titles}
            </button>
          ))}
        </div>
      </div>

      {/* Article display (right panel) */}
      <div className="lg:w-2/3">
        {selectedTitle && (
          <DisplayArticle source={source} title={selectedTitle} />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
