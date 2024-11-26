import axios from "axios"
import { NextResponse } from "next/server";

export async function GET() {
    try {

        // Fetch the data using axios
        const response = await axios.get('https://n1panel.com/api/v2?key=48b115b489551892c3e861bc6eeb96b4&action=services');

        // The data is in response.data
        const data = response.data;


        return NextResponse.json({ response: data })
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
        return NextResponse.json({ error: 'Error fetching data' });
    }
}