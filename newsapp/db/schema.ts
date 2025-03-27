import { pgTable, varchar, serial, text} from "drizzle-orm/pg-core";

// Basic user table Drizzle has nice functionality because it uses SQL like functions to query the database 
// which is different compared to frameworks like Django which abstract the SQL syntax from the users 
// pgTable function is the function used to query postgrese database there is other ones for diffrent 
// types of databases 
export const articles = pgTable("articles", {
  id: serial('id').primaryKey(),
  articleName: varchar({ length: 255 }).notNull(),
  link: varchar({ length: 255 }).notNull(),
  newsSource: varchar({length: 255}).notNull(),
  content: text(), 
  author: varchar() 
});
