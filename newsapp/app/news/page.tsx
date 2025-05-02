"use client";
import React, { useState } from "react";
import NewsSourceCard from "../components/NewsSourceCard";
import ArticleList from "../components/ArticleList";
import NewsSummary from "../components/NewsSummary";

const NewsPage: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  return (
    <div className="pt-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-montserrat font-semibold text-gray-900 mb-6">
        Political News Sources
      </h1>
      <NewsSummary />

      <p className="text-gray-700 text-base mb-8">
        Choose from a variety of political news sources to explore coverage from different viewpoints.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["BBC", "CNN", "Fox News"].map((source) => (
          <NewsSourceCard
            key={source}
            source={source}
            onClick={(src) => setSelectedSource(src)}
          />
        ))}
      </div>

      {selectedSource && <ArticleList source={selectedSource} />}
    </div>
  );
};

export default NewsPage;
