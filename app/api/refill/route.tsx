import { NextResponse } from 'next/server';
import axios from 'axios';

export const revalidate = 60;
export const dynamic = 'force-dynamic'; // <-- Tell Next.js this route can't be statically rendered

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const order = searchParams.get('order');

    if (!order) {
        return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    try {
        const response = await axios.post("https://godofpanel.com/api/v2", {
            key: "7aed775ad8b88b50a1706db2f35c5eaf",
            action: "refill",
            order,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error in refill API:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
