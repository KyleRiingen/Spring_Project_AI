import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { desc, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recentArticles = await db
      .select({
        articleName: articles.articleName,
        link: articles.link,
        imageUrl: articles.imageUrl
      })
      .from(articles)
      .where(isNotNull(articles.imageUrl))
      .orderBy(desc(articles.datePublished))
      .limit(25); // adjust as needed

    return NextResponse.json(recentArticles);
  } catch (error) {
    console.error("Failed to fetch all articles:", error);
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }
}
