import axios from "axios"
import { NextResponse } from "next/server";

export async function GET() {
    try {

        // Fetch the data using axios
        const response = await axios.get('https://smmsocialmedia.in/api/v2?key=71f467be80d281828751dc6d796f100a&action=services');

        // The data is in response.data
        const data = response.data;


        return NextResponse.json({ response: data })
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Error fetching data' });
    }
}