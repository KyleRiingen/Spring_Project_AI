// this hook is used to fetch the article list from the api

"use client";
import { useState, useEffect } from "react";

export interface Article {
  articleName: string;
  link: string;
  newsSource: string;
  content?: string;
  author?: string;
  imageUrl?: string;
  datePublished?: string;
}

const formatSource = (name: string) => name.toLowerCase().replace(/\s/g, "");

export const useArticles = (sources: string[]) => {
  const [news1, setNews1] = useState<Article[]>([]);
  const [news2, setNews2] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(news1);
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        if (sources.length === 1) {
          const source = formatSource(sources[0]);
          const res = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${source}`);
          if (!res.ok) throw new Error(`Error ${res.status}`);
          const data = await res.json();
          setNews1(data);
          setNews2([]);
        } else if (sources.length === 2) {
          const [s1, s2] = sources.map(formatSource);
          const [res1, res2] = await Promise.all([
            fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${s1}`),
            fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${s2}`)
          ]);

          if (!res1.ok || !res2.ok) throw new Error(`Error ${res1.status}, ${res2.status}`);
          const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
          setNews1(data1);
          setNews2(data2);
        } else {
          setNews1([]);
          setNews2([]);
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [sources]);

  return { news1, news2, loading, error };
};
