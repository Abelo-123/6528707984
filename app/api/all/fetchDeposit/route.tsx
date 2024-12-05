import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
    },
});

export async function GET() {

    try {
        const updateUserQuery = `
            SELECT id, did, uid, pm, amount, status, name FROM "deposit";
        `;

        const { rows } = await pool.query(updateUserQuery);

        // Log the rows to check the result from the query
        console.log("Rows returned from the database:", rows);

        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json({ success: false, error: 'No data found or rows are not in the expected format' });
        }

        // Process the rows to ensure the correct format
        const processedRows = rows.map((row) => {
            // Log each row to check if any data is missing\
            return {
                id: row.id ?? null,
                did: row.did ?? null,
                uid: row.uid ?? null,
                pm: row.pm ?? null,
                amount: row.amount ?? null,
                status: row.status ?? null,
                name: row.name ?? null,
            };
        });

        return NextResponse.json({ success: true, data: processedRows });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
