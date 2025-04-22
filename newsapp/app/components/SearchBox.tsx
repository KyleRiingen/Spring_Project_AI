"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useArticles } from "../hooks/useArticles";
import { useRouter } from "next/navigation";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  // ✅ Fetch each source separately
  const cnn = useArticles(useMemo(() => ["CNN"], []));
  const fox = useArticles(useMemo(() => ["Fox News"], []));
  const bbc = useArticles(useMemo(() => ["BBC"], []));

  // ✅ Merge all articles into one list
  const allArticles = useMemo(() => {
    return [
      ...(cnn.news1 || []),
      ...(fox.news1 || []),
      ...(bbc.news1 || []),
    ];
  }, [cnn.news1, fox.news1, bbc.news1]);

  // ✅ Filter by title
  const filteredArticles = useMemo(() => {
    if (!query) return [];
    return allArticles.filter((article) =>
      article.titles.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allArticles]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        placeholder="Search articles..."
        className="w-64 px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown */}
      {showDropdown && query.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {filteredArticles.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500">No matches found</li>
          ) : (
            filteredArticles.map((article, index) => (
              <li
                key={index}
                className="px-3 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  router.push(`/news?source=${encodeURIComponent(article.source)}&title=${encodeURIComponent(article.titles)}`);
                  setQuery(article.titles);
                  setShowDropdown(false);
                }}
              >
                {article.titles}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
