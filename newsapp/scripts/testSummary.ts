import { db } from "../db/db.ts";
import { articles } from "../db/schema.ts";
import { isNull } from "drizzle-orm";
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
        content: `Summarize the following article into a single paragraph:\n\n${text}`,
      },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content ?? "";
};

const testSummary = async () => {
  const [article] = await db
    .select()
    .from(articles)
    .where(isNull(articles.summary))
    .limit(1);

  if (!article || !article.content) {
    console.log("No article found with missing summary.");
    return;
  }

  try {
    const summary = await summarizeContent(article.content);
    console.log(`📰 ${article.articleName}`);
    console.log("📝 Summary:");
    console.log(summary);
  } catch (err) {
    console.error(`❌ Error for article ID ${article.id}:`, err);
  }
};

testSummary().catch(console.error);
