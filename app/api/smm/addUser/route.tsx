import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
    },
});

export async function POST(req) {
    try {
        const { name, username, profile } = await req.json();

        const queryText = `
      INSERT INTO users (id, name, username, profile)
      VALUES ($1, $2, $3)
      RETURNING  name, username, profile;
    `;
        const values = [name, username, profile];

        const { rows } = await pool.query(queryText, values);

        return NextResponse.json({ userdata: rows[0] });
    } catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
