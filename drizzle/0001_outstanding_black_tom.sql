CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"username" varchar(255),
	"phone" integer,
	"balance" real,
	"profile" varchar(255),
	"status" varchar(255)
);
