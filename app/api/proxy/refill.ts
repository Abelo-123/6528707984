import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Allow specific methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Handle preflight requests
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { order } = req.body; // Changed from req.query to req.body

    if (!order) {
        return res.status(400).json({ error: "Missing 'order' parameter" });
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

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error forwarding request to external API:", error);
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json({
                error: error.response?.data || "Failed to fetch data from external API",
            });
        } else {
            res.status(500).json({ error: "Unknown error occurred" });
        }
    }
}
