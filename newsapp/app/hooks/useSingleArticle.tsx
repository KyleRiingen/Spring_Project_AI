"use client";
import { useEffect, useState } from "react";
import { useRenderTime } from "../hooks/useRenderTime";

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
   datePublished?: string | Date;
}

export const useSingleArticle = (source: string, title: string | null) => {
   useRenderTime("useSingleArticle");
   const [article, setArticle] = useState<FullArticle | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!title) return;

      if (article != null) console.log("📦 Summary from API:", article); // ← is showing the real summary now

      const fetchArticle = async () => {
         setLoading(true);
         setError(null);

         try {
            const formattedSource = source.toLowerCase().replace(/\s/g, "");
            const res = await fetch(`/api/articles/${formattedSource}?title=${encodeURIComponent(title)}`);
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();

            if (data.length > 0) setArticle(data[0]);
         } catch (err: Error | unknown) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            console.error("Bias fetch error:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchArticle();
   }, [source, title]);

   return { article, loading, error };
};
