"use client";
import { useEffect, useState } from "react";

// This hook fetches a single article based on the source and title provided.

export interface FullArticle {
    articleName: string;
    content: string;
    author?: string;
    link?: string;
    newsSource?: string;
    biasRating?: string;
    category?: string;
    summary?: string;
    imageUrl?: string;
    datePublished?: string | Date
  }
  

export const useSingleArticle = (source: string, title: string | null) => {
  const [article, setArticle] = useState<FullArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 



  useEffect(() => {
    if (!title) return;

    if (article != null)
        console.log("📦 Summary from API:", article); // ← is showing the real summary now

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const formattedSource = source.toLowerCase().replace(/\s/g, "");
        const res = await fetch(`/api/articles/${formattedSource}?title=${encodeURIComponent(title)}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();

        if (data.length > 0) setArticle(data[0]);
      } catch (err: any) {
        console.error("Single article fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [source, title]);

  return { article, loading, error };
};
