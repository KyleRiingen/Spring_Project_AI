import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// Basic user table Drizzle has nice functionality because it uses SQL like functions to query the database 
// which is different compared to frameworks like Django which abstract the SQL syntax from the users 
// pgTable function is the function used to query postgrese database there is other ones for diffrent 
// types of databases 
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
