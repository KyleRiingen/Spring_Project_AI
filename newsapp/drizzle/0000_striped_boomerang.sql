CREATE TABLE "articles" (
	"id" integer PRIMARY KEY NOT NULL,
	"articleName" varchar(255),
	"content" text,
	"autho" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "news_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"articleName" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_id_news_id_fk" FOREIGN KEY ("id") REFERENCES "public"."news"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_articleName_news_articleName_fk" FOREIGN KEY ("articleName") REFERENCES "public"."news"("articleName") ON DELETE no action ON UPDATE no action;