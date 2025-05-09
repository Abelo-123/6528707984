import axios from "axios";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
    try {

        // Fetch the data using axios
        const response = await axios.get('https://godofpanel.com/api/v2?key=7aed775ad8b88b50a1706db2f35c5eaf&action=services');

        // The data is in response.data
        const data = response.data;

        return NextResponse.json({ response: data })
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', {
            message: error.message,
            stack: error.stack,
            config: error.config,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data,
            } : null,
        });
        return NextResponse.json({ error: 'Error fetching data' });
    }
}