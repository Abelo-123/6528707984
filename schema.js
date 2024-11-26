import { pgTable, varchar, uuid, integer, real } from "drizzle-orm/pg-core";
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('names', { length: 255 }),
    username: varchar('usernames', { length: 255 }),
    phone: integer('phone'), // Using `integer` instead of `int`
    balance: real('balance'), // Using `real` instead of `float`
    profile: varchar('profile', { length: 255 }),
    status: varchar('status', { length: 255 }),
});
