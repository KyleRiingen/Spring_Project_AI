import { db } from "../db/db.ts"; // Adjust if needed
import { articles } from "../db/schema.ts";
import { isNull, eq } from "drizzle-orm";

const predictBias = async (text: string) => {
  const res = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error(`Prediction failed: ${res.status}`);
  const data = await res.json();
  return data.predicted as string;
};

const updateBiases = async () => {
  const firstFive = await db
    .select()
    .from(articles)
    .where(isNull(articles.biasRating))
    .limit(100);

  for (const article of firstFive) {
    if (!article.content) continue;

    try {
      const prediction = await predictBias(article.content);

      // ✅ Update DB
      await db
        .update(articles)
        .set({ biasRating: prediction })
        .where(eq(articles.id, article.id));

      console.log(`🧠 Updated: ${article.articleName} → ${prediction}`);
    } catch (err) {
      console.error(`❌ Error for article ID ${article.id}:`, err);
    }
  }

  console.log("✅ Bias update complete.");
};

updateBiases().catch(console.error);
