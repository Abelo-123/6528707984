"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { supabase } from "@/app/lib/supabaseClient";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const RealTimeChart = () => {
    const [data, setData] = useState([]); // Holds the count values
    const [labels, setLabels] = useState([]); // Holds the time values

    // Set up a realtime subscription
    useEffect(() => {
        const subscribeToRealtimeData = () => {
            supabase
                .channel("deposit:uid=eq.100")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "deposit" },
                    (payload) => {
                        console.log("New payload received:", payload.new);

                        const newData = payload.new;
                        const newCount = parseInt(newData.count); // Extract the count value
                        const newTimestamp = new Date(newData.date).toLocaleTimeString(); // Format the date

                        setData((prevData) => {
                            if (prevData.length > 100) {
                                // Keep only the latest 100 data points
                                return [...prevData.slice(1), newCount];
                            }
                            return [...prevData, newCount];
                        });

                        setLabels((prevLabels) => {
                            if (prevLabels.length > 100) {
                                // Keep only the latest 100 timestamps
                                return [...prevLabels.slice(1), newTimestamp];
                            }
                            return [...prevLabels, newTimestamp];
                        });
                    }
                )
                .subscribe();
        };

        subscribeToRealtimeData();
    }, []);

    // Chart.js data
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Count",
                data: data,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    // Chart.js options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Real-Time Count Chart",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Count",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Real-Time Count Chart</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default RealTimeChart;
