/*
    * This API route generates a summary of news articles from the past specified number of days.
    * It retrieves articles from the database, combines their summaries, and uses OpenAI's model
    * to generate a concise summary.
    *
    * This should only be ran once per 24 hours to avoid wasting tokens.
 

*/





import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { and, gte } from "drizzle-orm";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const daysParam = url.searchParams.get("days");
    const days = daysParam ? parseInt(daysParam) : 1;

    if (![1, 3, 7].includes(days)) {
      return NextResponse.json({ error: "Invalid days value (must be 1, 3, or 7)" }, { status: 400 });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    // Get all articles with summary and datePublished in the time range
    const recentArticles = await db
      .select()
      .from(articles)
      .where(and(gte(articles.datePublished, cutoff), gte(articles.summary, "")));

    if (recentArticles.length === 0) {
      return NextResponse.json({ summary: "No articles available for this timeframe." });
    }

    const combinedSummaries = recentArticles
      .map((a) => a.summary?.trim())
      .filter(Boolean)
      .slice(0, 4)
      .join("\n\n");

    const prompt = `Here are summaries of news articles from the past ${days} day(s):\n\n${combinedSummaries}\n\nPlease write a 1–2 paragraph summary of the most important news.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano-2025-04-14",
      temperature: 0.5,
      messages: [
        { role: "system", content: "You are a concise news analyst." },
        { role: "user", content: prompt },
      ],
    });

    const finalSummary = completion.choices[0]?.message?.content?.trim();

    return NextResponse.json({ summary: finalSummary || "No summary generated." });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
