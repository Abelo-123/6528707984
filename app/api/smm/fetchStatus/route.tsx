import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
    },
});

// Function to simulate a delay (in milliseconds)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req) {



    try {
        // Parse the request body
        await delay(9000); // 3000ms = 3 seconds

        const { orderId } = await req.json();

        if (!orderId) {
            return NextResponse.json({ error: "Missing orderId parameter" }, { status: 400 });
        }

        // External API URL
        const url = `https://godofpanel.com/api/v2?key=7aed775ad8b88b50a1706db2f35c5eaf&action=status&order=${orderId}`;

        // Fetch data from the external API with timeout
        const response = await fetch(url, { method: "GET" });

        // Type assertion to ensure the response is a Response object
        if (!(response as Response).ok) {
            return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: (response as Response).status });
        }

        const data = await (response as Response).json();
        const { status, remains, start_count } = data;

        // Simulate a 3-second delay before responding

        // Update the database
        const updateUserQuery = `
            UPDATE orders
            SET status = $1, remains = $2, start_from = $3
            WHERE oid = $4
            RETURNING oid, status;
        `;
        const values = [status, remains, start_count, orderId];

        // Perform the query
        const { rows } = await pool.query(updateUserQuery, values);

        // If rows were updated, return the response
        if (rows.length > 0) {
            return NextResponse.json({ status, remains, start_count });
        } else {
            return NextResponse.json({ error: "Order not found or status not updated" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error handling request:", error);

        // Handle timeout errors separately
        if (error.message === "Request timed out") {
            return NextResponse.json({ error: "The external API request timed out" }, { status: 504 });
        }

        // Generic internal server error response
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}