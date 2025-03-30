import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function GET() { 
    try { 
        const data = await db.select().from(articles).where(eq(articles.newsSource, 'CNN'));
        
        return Response.json(data);
    } catch (error) { 
        console.log(error);
        return Response.json({error: "Error getting data"});
    }
}