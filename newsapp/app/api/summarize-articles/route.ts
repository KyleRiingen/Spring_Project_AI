/*
    This API route summarizes articles using OpenAI's model.
    It retrieves articles from the database that do not have a summary,
    generates a summary using OpenAI, and then updates the database with the new summary.
    The route is designed to be called periodically to keep the article summaries up to date.


    This should be ran once per 24 hours. Run at the same time as the article fetcher.


*/

import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { or, eq, isNull } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
   try {
      // 1. Get articles without a summary
      const unsummarizedArticles = await db
         .select()
         .from(articles)
         .where(or(isNull(articles.summary), eq(articles.summary, "")));

      const updated = [];

      for (const article of unsummarizedArticles) {
         const content = article.content?.trim();
         if (!content || content.length < 200) {
            console.log(`Skipping short/empty article: ${article.articleName}`);
            continue;
         }

         // 2. Ask OpenAI to summarize
         const prompt = `Summarize this news article in 2-3 concise sentences:\n\n${content}`;

         const completion = await openai.chat.completions.create({
            model: "gpt-4.1-nano-2025-04-14",
            messages: [
               { role: "system", content: "You are a helpful and concise news summarizer." },
               { role: "user", content: prompt },
            ],
            temperature: 0.5,
         });

         const summary = completion.choices[0]?.message?.content?.trim();

         if (summary) {
            // 3. Save summary back to DB
            await db.update(articles).set({ summary }).where(eq(articles.articleName, article.articleName));

            updated.push({ title: article.articleName, summary });
            console.log(`✔️ Summarized: ${article.articleName}`);
         }
      }

      return NextResponse.json({ updatedCount: updated.length, updated });
   } catch (error) {
      console.error("Error summarizing articles:", error);
      return NextResponse.json({ error: "Failed to summarize articles" }, { status: 500 });
   }
}
