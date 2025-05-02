CREATE TABLE "daily_summaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"days" integer NOT NULL,
	"summary" text NOT NULL,
	"generated_at" timestamp DEFAULT now() NOT NULL
);
