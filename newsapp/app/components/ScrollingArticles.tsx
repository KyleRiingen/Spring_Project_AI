"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Article = {
  articleName: string;
  link: string;
  imageUrl?: string;
};

const shuffle = (array: Article[]) => {
  return array
    .map((a) => [Math.random(), a] as [number, Article])
    .sort((a, b) => a[0] - b[0])
    .map(([, a]) => a);
};

const ScrollingArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/all-articles");
        const data = await res.json();
        const randomized = shuffle(data).slice(0, 20);
        setArticles(randomized);
      } catch (err) {
        console.error("Error fetching scrolling articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading || articles.length === 0) return null;

  return (
    <div className="overflow-hidden py-6 bg-[#F8FAFC] border-y border-[#CBD5E1]">
      <motion.div
        className="flex gap-6 px-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...articles, ...articles].map((article, index) => (
          <Link
            key={index}
            href={article.link}
            target="_blank"
            className="w-64 flex-shrink-0 flex flex-col items-center justify-start p-4 border border-[#CBD5E1] rounded-lg bg-white hover:bg-[#F1F5F9] transition"
          >
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.articleName}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <p className="text-sm text-[#1F2A44] text-center font-montserrat font-medium mt-1 whitespace-normal break-words leading-snug line-clamp-2 h-10">
              {article.articleName}
            </p>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingArticles;
