import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.js',
  out: './drizzle',
  dbCredentials: {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 5432,
    user: 'postgres.bihqharjyezzxhsghell',
    password: 'newPass12311220yU',
    database: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
  },
  dialect: 'postgresql',
} satisfies Config;
