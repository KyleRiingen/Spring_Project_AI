import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const articles = pgTable("articles", {
	id: serial().primaryKey().notNull(),
	articleName: varchar({ length: 255 }).notNull(),
	link: varchar({ length: 255 }).notNull(),
	newsSource: varchar({ length: 255 }).notNull(),
	content: text(),
	author: varchar(),
});
