import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!); 

// This API Endpoint will be used to create new articles in the database
export async function POST(request: Request) { 

    const requestBody = await request.json();
    return Response.json(requestBody);
    
}