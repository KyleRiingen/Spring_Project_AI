"use client";
import React, { useState } from "react";
import NewsSourceCard from "../components/NewsSourceCard";
import ArticleList from "../components/ArticleList";
import NewsSummary from "../components/NewsSummary";

const NewsPage: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto font-montserrat">
      <h1 className="text-5xl font-bold text-[#1F2A44] mb-4">
        Browse Political News
      </h1>
      <p className="text-lg text-[#4C5760] mb-8 max-w-3xl">
        Unbias.ai aggregates articles from top political sources and summarizes
        trends using AI. Select a source to explore recent articles.
      </p>

      <NewsSummary />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {["BBC", "CNN", "Fox News"].map((source) => (
          <NewsSourceCard
            key={source}
            source={source}
            onClick={(src) => setSelectedSource(src)}
          />
        ))}
      </div>

      {selectedSource && (
        <div className="mt-14">
          <ArticleList source={selectedSource} />
        </div>
      )}
    </main>
  );
};

export default NewsPage;
