import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET(req: Request) { 
    try { 
        const url = new URL(req.url);
        if(url) { 
            const title = url.searchParams.get('title');
            if(title) { 
                // Get the data about the article given the title 
                const article = await db.select().from(articles).where(eq(articles.articleName, title));
                return Response.json(article);
            } else { 
                // Grab all the titles of articles f
                const titles = await db.select({titles: articles.articleName}).from(articles).where(eq(articles.newsSource, 'Fox News'));
                return Response.json(titles);
            }
        } else { 
            return Response.json({error: "Error getting the data no url"});
        }  
    } catch (error) { 
        console.log(error);
        return Response.json({error: "Error getting data"});
    }
}