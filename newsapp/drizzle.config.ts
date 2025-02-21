import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts', // Where the schema or setup for the tables is located 
  dialect: 'postgresql', // Type of database used so object oriented database compared to a relational database
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // When generating migrations so pushing changes to our database this tells us what changes happen
  strict: true // If running migration and changes need to be made to the database will ask us what changes need to happen
});