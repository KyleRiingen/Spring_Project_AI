import { db } from "../db/db.ts";
import { articles } from "../db/schema.ts";
import { isNull, eq } from "drizzle-orm";
import { config } from "dotenv";
import { OpenAI } from "openai";

config(); // Load .env

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const summarizeContent = async (text: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarize the following article into a single concise paragraph:\n\n${text}`,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content ?? "";
};

const updateSummaries = async () => {
  const articlesToUpdate = await db
    .select()
    .from(articles)
    .where(isNull(articles.summary))
    .limit(2); // ✅ Only 2 articles

  for (const article of articlesToUpdate) {
    if (!article.content) continue;

    try {
      const summary = await summarizeContent(article.content);

      if (!summary.trim()) {
        console.warn(`⚠️ Skipped: OpenAI returned empty summary for "${article.articleName}"`);
        continue;
      }

      // ✅ Print summary to console
      console.log(`📰 ${article.articleName}`);
      console.log(`📝 ${summary}`);
      console.log("—".repeat(40));

      // ✅ Update DB
      await db
        .update(articles)
        .set({ summary: summary })
        .where(eq(articles.id, article.id));

    } catch (err) {
      console.error(`❌ Error for article ID ${article.id}:`, err);
    }
  }

  console.log("✅ Summary update complete.");
};

updateSummaries().catch(console.error);
