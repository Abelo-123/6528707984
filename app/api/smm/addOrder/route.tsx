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
        // Destructure the data from the request body
        const { id, category, username, service, link, quantity, charge, refill, panel } = await req.json();

        // Prepare the SQL query to insert data into the 'orders' table
        const queryText = `
        INSERT INTO orders (category, service, quantity, link, charge, refill, panel, status, username, chat, uid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id;
      `;

        // Prepare the values for the query
        const values = [
            category,
            service,
            quantity,
            link,
            charge,
            refill,
            panel,
            'Pending', // Set status to 'Pending'
            username,
            `https://t.me/${username}`,
            id,// Telegram chat link
        ];

        // Insert data into the 'orders' table and get the inserted row's 'id'
        const { rows } = await pool.query(queryText, values);
        const orderId = rows[0].id;  // Get the 'id' of the inserted order

        // Construct the URL for the external API call
        const apiUrl = `https://smmsocialmedia.in/api/v2?key=71f467be80d281828751dc6d796f100a&action=add&service=${service}&link=${link}&quantity=${quantity}`;

        // Make the API request to the external service
        const apiResponse = await fetch(apiUrl, {
            method: 'GET', // Use GET method for the request
        });

        // Check if the API request was successful
        if (!apiResponse.ok) {
            throw new Error(`API request failed with status: ${apiResponse.status}`);
        }

        // Parse the response from the API
        const apiData = await apiResponse.json();

        const updateUserQuery = `
      UPDATE users
      SET balance = balance - $1
      WHERE id = (SELECT uid FROM orders WHERE id = $2)
      RETURNING id, balance;
    `;

        // Execute the update query for the user
        const updateValues = [charge, orderId]; // The charge to subtract and the orderId to find the user
        const { rows: updatedUserRows } = await pool.query(updateUserQuery, updateValues);

        // If the user was successfully updated, the new balance will be in the returned rows
        const updatedUser = updatedUserRows[0];
        if (!updatedUser) {
            return NextResponse.json({
                // 'id' from the database
                success: 'false'
            });
        }


        // Return both the 'id' from the database and the 'order' data from the API
        return NextResponse.json({
            // 'id' from the database
            success: 'true'
        });

    } catch (error) {
        // Handle errors
        console.error("Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

