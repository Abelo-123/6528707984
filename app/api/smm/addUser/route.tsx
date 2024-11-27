import { NextResponse } from "next/server";

export async function POST(req) {

    const { id, name, username, profile } = await req.json()
    return NextResponse.json({ userdata: [{ id, name, username, profile }] })
}