import 'dotenv/config';
import { articles } from '@/db/schema';
import { db } from '@/db/db';

type Article = {
    title: string;
    url: string;
    content?: string;
    newsSource: string;
    author?: string 
};

// Fetch all the data from the specified endpoints already created 
async function fetchData(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
        return await res.json();
    } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return null;
    }
}

async function saveDataToDatabase(data: Article[]) {
    try {
        for (const article of data) {
            // Check if article exists and has a title before inserting
            if (!article || !article.title) {
                console.warn("Skipping invalid article:", article);
                continue; // Skip this iteration if the article is invalid
            }

            // Ensure that article has content and author before inserting
            if (article.author !== "" && article.content !== "") {
                await db.insert(articles).values({
                    articleName: article.title,
                    link: article.url,
                    newsSource: article.newsSource,
                    content: article.content ?? "", // Use null if content is missing
                    author: article.author ?? "" // Use null if author is missing
                });
                console.log("Inserted:", article.title);
            }
        }

        console.log("All valid data saved successfully");
        return { success: true, message: "Data saved successfully" };
    } catch (error) {
        console.error("Error saving data to database:", error);
        return { success: false, message: "Failed to save data" };
    }
}

// This API Endpoint will be used to create new articles in the database on vercel cron jobs once a day
export async function GET() { 
    const endpoints: string[] = [
        "http://localhost:3000/api/scraper/cnn",
        "http://localhost:3000/api/scraper/foxnews",
        "http://localhost:3000/api/scraper/bbc",
    ]

    // Wait for all the results to return will take a few minutes depending on the power of cpu 
    const results = await Promise.all(endpoints.map(fetchData));
    
    // Remove null data
    const validData = results.filter(data => data !== null);

    // If no data returned error occurred 
    if (validData.length === 0) {
        return Response.json({ error: "No valid data retrieved" }, { status: 500 });
    }
    const allArticles = validData.flatMap(group => group.articles);
    // Save all the articles to the database 
    const saveResult = await saveDataToDatabase(allArticles);

    return Response.json(saveResult);

}