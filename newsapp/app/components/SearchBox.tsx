// components/SearchBox.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useArticles } from "../hooks/useArticles";

const SearchBox: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const cnn = useArticles(useMemo(() => ["CNN"], []));
  const fox = useArticles(useMemo(() => ["Fox News"], []));
  const bbc = useArticles(useMemo(() => ["BBC"], []));

  const allArticles = useMemo(() => [
    ...(cnn.news1 || []),
    ...(fox.news1 || []),
    ...(bbc.news1 || []),
  ], [cnn.news1, fox.news1, bbc.news1]);

  const filteredArticles = useMemo(() => {
    if (!query) return [];
    return allArticles.filter((article) =>
      article.articleName.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allArticles]);

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="p-2 hover:bg-[#66635B]/30 rounded-full transition"
      >
        <img src="search.svg" alt="Search" className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 z-10"
          >
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-64 px-3 py-2 text-sm border border-[#A59E8C] rounded-md bg-white shadow focus:outline-none"
            />
            {query && (
              <ul className="absolute mt-1 w-64 bg-white max-h-60 overflow-y-auto shadow rounded-md border border-gray-200 z-20">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 text-sm hover:bg-[#93A8AC]/20 cursor-pointer"
                      onClick={() => {
                        router.push(`/news?source=${encodeURIComponent(article.source)}&title=${encodeURIComponent(article.articleName)}`);
                        setQuery(article.articleName);
                        setExpanded(false);
                      }}
                    >
                      {article.articleName}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-500">No matches found</li>
                )}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
