ALTER TABLE "users" ADD COLUMN "names" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "usernames" varchar(255);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";