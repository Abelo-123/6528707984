// import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
//     },
// });

// export async function POST(req) {

//     const { service } = await req.json();
//     try {

//         const updateUserQuery = `
//         SELECT (description) FROM "desc"
// WHERE service = $1;
//     `;

//         const values = [service];

//         const { rows } = await pool.query(updateUserQuery, values);

//         return NextResponse.json({ success: rows });
//     } catch (error) {
//         console.error("Error inserting data:", error);
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }
