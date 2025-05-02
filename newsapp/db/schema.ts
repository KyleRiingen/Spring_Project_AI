import { pgTable, varchar, serial, text, timestamp, integer} from "drizzle-orm/pg-core";

// Basic user table Drizzle has nice functionality because it uses SQL like functions to query the database 
// which is different compared to frameworks like Django which abstract the SQL syntax from the users 
// pgTable function is the function used to query postgrese database there is other ones for diffrent 
// types of databases 

export const articles = pgTable("articles", {
	id: serial().primaryKey().notNull(),
	articleName: varchar({ length: 255 }).notNull(),
	link: varchar({ length: 255 }).notNull(),
	newsSource: varchar({ length: 255 }).notNull(),
	content: text(),
	author: varchar(),

  biasRating: varchar({ length: 50 }),
  category: varchar({ length: 100 }),
  summary: text(),
  imageUrl: varchar({ length: 500 }),
  datePublished: timestamp()

});

export const dailySummaries = pgTable("daily_summaries", {
	id: serial("id").primaryKey(),
	days: integer("days").notNull(), // 1, 3, or 7
	summary: text("summary").notNull(),
	generatedAt: timestamp("generated_at").defaultNow().notNull(),
  });
  
