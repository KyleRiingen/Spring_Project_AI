import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const title = url.searchParams.get("title");
    if (title) {
      // Return the full article matching the title
      const article = await db.select().from(articles).where(eq(articles.articleName, title));
      return Response.json(article);
    } else {
      // Return all articles from Fox News with full data
      const allArticles = await db
        .select()
        .from(articles)
        .where(eq(articles.newsSource, "Fox News"));

      return Response.json(allArticles);
    }
  } catch (error) {
    console.error("Error fetching Fox articles:", error);
    return Response.json({ error: "Error getting data" });
  }
}
