import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
    },
});

export async function POST(req) {
    const { did, uid } = await req.json();

    try {
        // Update the deposit table
        const updateUserQuery = `
            UPDATE deposit
            SET status = $2
            WHERE did = $1;
        `;
        const values = [did, "Done"];
        const row = await pool.query(updateUserQuery, values);

        if (row) {
            // Insert into adminmessage table
            const queryText = `
                INSERT INTO adminmessage ("for", message, "from")
                VALUES ($1, $2, $3);
            `;
            const valuess = [uid, "Done", "Deposit"];
            const roww = await pool.query(queryText, valuess);

            if (roww) {
                return NextResponse.json({ status: "Done", did: did });
            }
        }

        return NextResponse.json({ success: false, error: "Failed to insert into adminmessage." });
    } catch (error) {
        console.error("Error inserting data:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
