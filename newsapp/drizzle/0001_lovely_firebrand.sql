ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "articles" CASCADE;--> statement-breakpoint
ALTER TABLE "news" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "news" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "newsSource" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "author" varchar;