import { NextResponse } from "next/server";
import { Pool } from "pg";
const { Client } = require('pg-native');

// Set up the connection pool using your connection string
const pool = new Pool({
    connectionString: "postgresql://postgres.bihqharjyezzxhsghell:newPass12311220yU@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require",
    ssl: {
        rejectUnauthorized: false,  // Disable certificate validation
    },
    client: new Client()
});

export async function POST(req) {
    try {
        // Parse the incoming JSON request
        const { name, username, profile } = await req.json();

        // Create a client from the connection pool
        const client = await pool.connect();

        // Insert data into the users table
        const queryText = `
      INSERT INTO users (name, username, profile)
      VALUES ($1, $2, $3)
      RETURNING name, username, profile;
    `;
        const values = [name, username, profile];

        // Execute the query

        await client.query(queryText, values);

        // Release the client back to the pool
        client.release();

        // Return the inserted user data
        return NextResponse.json({ userdata: values });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
