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
export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    uid: uuid('uid'),
    service: integer('service'),
    quantity: integer('quantity'),
    charge: real('charge'),
    refill: varchar('refill', { length: 255 }),
    clicked: real('clicked'),
    panel: varchar('panel', { length: 255 }),
    status: varchar('status', { length: 255 }),
});
