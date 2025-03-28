import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!); 

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

async function saveDataToDatabase(data) {
    try {
        console.log("Saving to database:", JSON.stringify(data, null, 2));
        return { success: true, message: "Data saved successfully" };
    } catch (error) {
        console.error("Error saving data to database:", error);
        return { success: false, message: "Failed to save data" };
    }
}

// This API Endpoint will be used to create new articles in the database on vercel cron jobs once a day
export async function POST() { 
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
    // Save all the articles to the database 
    const saveResult = await saveDataToDatabase(validData);

    return Response.json(saveResult);

}