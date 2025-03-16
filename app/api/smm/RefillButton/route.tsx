// app/api/refill/route.js

export async function POST(req) {
    try {
        const { order } = await req.json(); // Extract order ID from the request body

        if (!order) {
            return new Response(JSON.stringify({ error: "Order ID is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const apiUrl = `https://godofpanel.com/api/v2?key=7aed775ad8b88b50a1706db2f35c5eaf&action=refill&order=${order}`;

        const response = await fetch(apiUrl, { method: "POST" });
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
