"use client";
import { useEffect, useState } from "react";

interface BiasResult {
   predicted: string;
   bias_scores: number[];
}

export const useBiasPrediction = (text: string | null) => {
   const [bias, setBias] = useState<BiasResult | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (!text) return;

      setBias(null); // Clear previous result
      setLoading(true);
      setError(null);

      const fetchBias = async () => {
         try {
            const res = await fetch("http://localhost:8000/predict", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ text }),
            });

            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();
            setBias(data);
         } catch (err: any) {
            setError(err.message || "Unknown error");
            console.error("Bias fetch error:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchBias();
   }, [text]);

   return { bias, loading, error };
};
