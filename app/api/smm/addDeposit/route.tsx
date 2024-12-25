// import { NextResponse } from "next/server";
// import { Pool } from "pg";

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false, // Required for some managed services like Heroku or Supabase
//     },
// });

// export async function POST(req) {
//     try {
//         const { did, uid, pm, amount, name } = await req.json();

//         const queryText = `
//       INSERT INTO deposit (did, uid, pm, amount, name)
//       VALUES ($1, $2, $3, $4, $5)
//     `;
//         const values = [did, uid, pm, amount, name];

//         await pool.query(queryText, values);

//         return NextResponse.json({ success: "success" });
//     } catch (error) {
//         console.error("Error inserting data:", error);
//         return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
// }
