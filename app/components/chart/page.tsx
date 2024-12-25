"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { supabase } from "@/app/lib/supabaseClient";
import { useUser } from "../UserContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const RealTimeChart = () => {
    const { userData } = useUser()
    const [amountData, setAmountData] = useState([]); // Amount values
    const [countData, setCountData] = useState([]); // Count values
    const [labels, setLabels] = useState([]); // Time labels

    // Function to fetch initial data
    const fetchInitialData = async () => {
        const { data, error } = await supabase
            .from("deposit")
            .select("amount, count, date")
            .order("date", { ascending: false }) // Fetch most recent records first
            .limit(userData.userId); // Limit to the latest 100 records

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            const initialAmountData = data.map((item) => parseInt(item.amount));
            const initialCountData = data.map((item) => parseInt(item.count));
            const initialLabels = data.map((item) => new Date(item.date).toLocaleTimeString());

            // Set the fetched data as the initial state
            setAmountData(initialAmountData);
            setCountData(initialCountData);
            setLabels(initialLabels);
        }
    };

    // Fetch initial data and set up the subscription for real-time updates
    useEffect(() => {
        fetchInitialData(); // Fetch initial data when the component mounts

        const channel = supabase
            .channel(`deposit:uid=eq.${userData.userId}`)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "deposit" },
                (payload) => {

                    const newData = payload.new;
                    const newAmount = parseInt(newData.amount); // Convert amount to a number
                    const newCount = parseInt(newData.count); // Count value
                    const newTimestamp = new Date(newData.date).toLocaleTimeString(); // Format the date

                    // Update amount data
                    setAmountData((prevAmountData) => {
                        if (prevAmountData.length > 100) {
                            return [...prevAmountData.slice(1), newAmount];
                        }
                        return [...prevAmountData, newAmount];
                    });

                    // Update count data
                    setCountData((prevCountData) => {
                        if (prevCountData.length > 100) {
                            return [...prevCountData.slice(1), newCount];
                        }
                        return [...prevCountData, newCount];
                    });

                    // Update labels
                    setLabels((prevLabels) => {
                        if (prevLabels.length > 100) {
                            return [...prevLabels.slice(1), newTimestamp];
                        }
                        return [...prevLabels, newTimestamp];
                    });
                }
            )
            .subscribe();

        // Clean up subscription
        return () => {
            supabase.removeChannel(channel);
        };
    }, []); // Empty dependency array to run only once when the component mounts

    // Chart.js data for Amount
    const amountChartData = {
        labels: labels,
        datasets: [
            {
                label: "Amount",
                data: amountData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    // Chart.js data for Count
    const countChartData = {
        labels: labels,
        datasets: [
            {
                label: "Count",
                data: countData,
                borderColor: "rgba(192, 75, 75, 1)",
                backgroundColor: "rgba(192, 75, 75, 0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    // Chart.js options (without using the plugins key)
    const amountChartOptions = {
        responsive: true,
        title: {
            display: true,
            text: "Amount vs. Time", // Chart title
        },
        legend: {
            display: true,
            position: "top", // Valid position
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const countChartOptions = {
        responsive: true,
        title: {
            display: true,
            text: "Count vs. Time", // Chart title
        },
        legend: {
            display: true,
            position: "top", // Valid position
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Real-Time Charts</h2>
            <div style={{ marginBottom: "30px" }}>
                <h3>Amount vs. Time</h3>
                <Line data={amountChartData} options={amountChartOptions} />
            </div>
            <div>
                <h3>Count vs. Time</h3>
                <Line data={countChartData} options={countChartOptions} />
            </div>
        </div>
    );
};

export default RealTimeChart;
