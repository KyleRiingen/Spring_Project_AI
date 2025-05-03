/*
    * This API route generates a summary of news articles from the past specified number of days.
    * It retrieves articles from the database, combines their summaries, and uses OpenAI's model
    * to generate a concise summary.
    *
    * Inputs result into daily_summaries table with the number of days and generated summary.
    * 
    * This should only be ran once per 24 hours to avoid wasting tokens.
 

*/

import { db } from "@/db/db";
import { articles, dailySummaries } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";
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

      const now = new Date();
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - days);

      // 1. Check if a summary already exists from the last 24 hours
      const recentSummaries = await db
         .select()
         .from(dailySummaries)
         .where(
            and(
               eq(dailySummaries.days, days),
               gte(dailySummaries.generatedAt, new Date(now.getTime() - 24 * 60 * 60 * 1000)) // last 24 hours
            )
         );

      if (recentSummaries.length > 0) {
         return NextResponse.json({ summary: recentSummaries[0].summary, cached: true });
      }

      // 2. Pull recent articles
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
         .slice(0, 10) // Limit for cost during testing
         .join("\n\n");

      const prompt = `Here are summaries of news articles from the past ${days} day(s):\n\n${combinedSummaries}\n\nPlease write a 1–2 paragraph summary of the most important news.`;

      const completion = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         temperature: 0.5,
         messages: [
            { role: "system", content: "You are a concise news analyst." },
            { role: "user", content: prompt },
         ],
      });

      const finalSummary = completion.choices[0]?.message?.content?.trim();

      if (!finalSummary) {
         return NextResponse.json({ error: "OpenAI returned no summary" }, { status: 500 });
      }

      // 3. Save the generated summary
      await db.insert(dailySummaries).values({
         days,
         summary: finalSummary,
         generatedAt: new Date(),
      });

      return NextResponse.json({ summary: finalSummary, cached: false });
   } catch (error) {
      console.error("Summary generation error:", error);
      return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
   }
}
