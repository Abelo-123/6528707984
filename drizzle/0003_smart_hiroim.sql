CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"uid" uuid,
	"service" integer,
	"quantity" integer,
	"charge" real,
	"refill" varchar(255),
	"clicked" real,
	"panel" varchar(255),
	"status" varchar(255)
);
