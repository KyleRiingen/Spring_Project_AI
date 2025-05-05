"use client";
import { useEffect, useState } from "react";

export const useSummary = (days: number) => {
   const [summary, setSummary] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [cached, setCached] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchSummary = async () => {
         setLoading(true);
         setSummary(null);
         setError(null);
         try {
            const res = await fetch(`/api/time-based-summary?days=${days}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load summary");
            setSummary(data.summary);
            setCached(data.cached || false);
         } catch (error: unknown) {
            console.log(error);
            if (error instanceof Error) {
               throw new Error(`Error getting user: ${error.message}`);
            }
            throw new Error("Error getting user");
         } finally {
            setLoading(false);
         }
      };

      fetchSummary();
   }, [days]);

   return { summary, loading, cached, error };
};
