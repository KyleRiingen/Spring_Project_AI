ALTER TABLE "articles" ADD COLUMN "biasRating" varchar(50);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "summary" text;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "imageUrl" varchar(500);