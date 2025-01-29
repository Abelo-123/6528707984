"use client";
import { List, Section, Text } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import axios from "axios";
import { useNot } from '../StatusContext';
import MyLoader from "../Loader/page";
import { faLink, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Smmhistory = () => {

    const [loader, setLoader] = useState(false)
    //const { userData } = useUser();
    const delay = (ms: number) => new Promise(resolve => {
        const interval = setInterval(() => {
            clearInterval(interval);
            resolve(true);
        }, ms);
    });

    const { useNotification, setNotification } = useNot();

    const [data, setData] = useState<any[]>([]); // Adjust the type based on your data structure

    // Fetch order status for each order
    const fetchOrderStatus = async (orderId: string) => {
        await delay(9000); // Wait for 2 seconds

        // Find the current status of the order from the state (data array)
        const currentStatus = data.find((item) => item.oid === orderId)?.status;

        // If the status is already "Completed", skip the API call
        if (currentStatus === "Completed" || currentStatus === "Canceled") {
            console.log(`Skipping API call for order ${orderId}, status is already 'Completed'.`);
            return; // Exit the function early, skipping the API request
        } else {
            const url = '../../api/smm/fetchStatus';
            try {
                // console.log(orderId)

                // // Sending the orderId in the request body using POST
                const response = await axios.post(url, {
                    orderId: orderId, // Sending orderId as JSON in the body
                });

                const result = response.data; // Axios response contains data directly

                // // Assuming the result is structured like { orderId: { status: "someStatus", ... }}
                if (result[orderId]) {
                    const { status, charge, start_count, remains, currency } = result[orderId];

                    //     // If the response contains status for the given orderId, update the relevant data
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.oid === orderId
                                ? { ...item, status, charge, start_count, remains, currency } // Update relevant fields
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error("Failed to fetch order status:", error);
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                }
            }
        }

        // Same URL, but we're using POST

        // Simulating a 2-second delay before making the API call



    };

    const [expandedRow, setExpandedRow] = useState(null);

    const handleToggle = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };




    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?2";
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
            const Telegram = window.Telegram;
            Telegram.WebApp.expand();
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.ready();

                const { user } = Telegram.WebApp.initDataUnsafe;
                const auth = async () => {

                    setLoader(true)
                    // Fetch the initial data (orders) from Supabase or any other source
                    const { data: initialData, error } = await supabase
                        .from("orders")
                        .select("*")
                        .eq("uid", user.id) // Filter by user id or another parameter as needed
                        .order('date', { ascending: false });

                    if (error) {
                        console.log(error);
                    } else {
                        setData(initialData); // Set the initial data
                        setLoader(false)
                        // Immediately call fetchOrderStatus for each order to fetch the initial status
                        initialData.forEach((item) => {
                            // Ensure we're only fetching for orders that are not "Completed" or "Cancelled"
                            if (item.status === "Pending" && (item.status !== "Completed" && item.status !== "Canceled")) {
                                fetchOrderStatus(item.oid); // Fetch status immediately for non-completed orders
                            }
                        });

                        // Create intervals for polling, only for non-completed or non-cancelled orders
                        const intervals = initialData
                            .filter((item) => item.status !== "Completed" && item.status !== "Canceled") // Filter out completed/cancelled orders
                            .map((item) => {

                                return setInterval(() => fetchOrderStatus(item.oid), 9000); // Polling only for non-completed orders every 2 seconds
                            });

                        // Cleanup intervals when the component unmounts or when data changes
                        return () => {
                            intervals.forEach(clearInterval); // Clear all intervals
                        };
                    }
                }



                auth();
            }
        }
        // Call the auth function when the component is mounted
    }, []); // Empty dependency array ensures this effect runs only once after initial render
    // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?2";
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
            const Telegram = window.Telegram;
            Telegram.WebApp.expand();
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.ready();

                const { user } = Telegram.WebApp.initDataUnsafe;
                // Create a real-time channel for the 'orders' table
                const channel = supabase
                    .channel("orders_channel")
                    .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders", filter: `uid=eq.${user.id}` }, (payload) => {
                        //console.log("New order inserted:", payload.new);
                        // Add the new order to the state
                        //  if (payload.new.uid == 5928771903) {
                        setData((prevData) => [payload.new, ...prevData]);

                        // If the new order status is not "Completed", call fetchOrderStatus
                        if (payload.new.status !== "Completed" && payload.new.status !== "Canceled") {
                            fetchOrderStatus(payload.new.oid); // Fetch status for new order
                        }

                    })
                    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders", filter: `uid=eq.${user.id}` }, (payload) => {
                        //console.log("Order updated:", payload.new.status, "for oid", payload.new.oid);
                        // if (payload.new.uid == 5928771903) {
                        // Find the updated order in the current state
                        setData((prevData) =>
                            prevData.map((item) =>
                                item.oid === payload.new.oid
                                    ? { ...item, status: payload.new.status, start_count: payload.new.start_from, remains: payload.new.remains } // Update the status in the state
                                    : item
                            )
                        );

                        // If the updated order's status is not "Completed", call fetchOrderStatus
                        if (payload.new.status === "Pending" && (payload.new.status !== "Cancelled" || payload.new.status !== "Completed")) {
                            fetchOrderStatus(payload.new.oid); // Fetch status for updated order
                        }

                    })


                    .subscribe();

                // Cleanup the subscription on component unmount
                return () => {
                    channel.unsubscribe();
                };
            }
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <>

            <List
                style={{
                    padding: "0px 0px",
                }}
            >
                {
                    useNotification.notificationModal && (
                        <div style={{
                            zIndex: 900, background: 'var(--tgui--section_bg_color)'
                        }} className=" modal-popp fixed inset-0 top-0 bottom-0 w-screen ">

                            {useNotification.notificationLoader && <MyLoader style={{ marginTop: '2rem' }} />}
                            <div style={{ height: '85%' }} className='mt-2 '>
                                <div className="  w-screen " >
                                    {

                                        !useNotification.notifcationLoader && useNotification.notificationData && useNotification.notificationData.map((items, index) => (

                                            <li key={index} className="flex w-11/12 p-3 mx-auto" style={{ borderTop: '2px solid black' }}>
                                                <div className="block w-full px-2">
                                                    <div className="text-right ml-auto"> {items.from}</div>
                                                    <div className="text ml-2"> {items.message}</div>
                                                </div>
                                            </li>

                                        ))

                                    }
                                </div>
                            </div>
                            <div className='absolute  w-full grid place-content-center bottom-4'>
                                < div onClick={() => {
                                    setNotification((prevNotification) => ({
                                        ...prevNotification, // Spread the previous state
                                        notificationModal: false,
                                        notificationData: [],
                                        notificationLoader: true,
                                        // Update the `deposit` field
                                    }));
                                }} className="p-3 ">
                                    <FontAwesomeIcon icon={faRotateBackward} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                    <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Back</Text>
                                </div>
                            </div>
                        </div >
                    )
                }
                <Section header="Order History" style={{ marginTop: '-0.5rem', border: "1px solid var(--tgui--section_bg_color)" }}>
                    <div style={{ width: "100%" }} className=" mx-auto">
                        {loader && <MyLoader />}
                        <div style={{ borderRadius: "10px", height: '26.2rem', width: '100%' }} className="scrollabler bg-red-100 w-full overflow-x-auto">

                            {!loader &&
                                <table style={{ width: "100%" }} className="   rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                Starting From
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Remains</th>


                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Link</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                Charge (ETB)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className=" ">
                                        {data.map((items, index) => {
                                            const isExpanded = expandedRow === index;
                                            const truncatedLink =
                                                items.link.length > 20 ? `${items.link.substring(0, 20)}...` : items.link;

                                            return (
                                                <tr key={index}>
                                                    <td
                                                        style={{
                                                            textShadow:
                                                                items.status === "Canceled" ? "2px 2px 29px red" :
                                                                    items.status === "Completed" ? "2px 2px 29px rgba(0,255,77,0.86)" :
                                                                        items.status === "Pending" ? "2px 2px 29px rgba(255,221,45,0.86);" :
                                                                            items.status === "In progress" ? "2px 2px 29px rgba(0,66,255,0.94)" :
                                                                                undefined
                                                        }}
                                                        className="px-6 py-4 text-sm ">{items.status}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.oid}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.start_count}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.quantity}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.remains}</td>


                                                    <td className="px-6 py-4 text-sm">

                                                        <span className="flex">
                                                            {
                                                                items.link && (() => {
                                                                    try {
                                                                        const url = new URL(items.link); // Validate URL
                                                                        return (
                                                                            <a
                                                                                href={url.href}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                style={{ display: "inline-block", marginRight: '0.5rem' }}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faLink}
                                                                                    style={{ margin: 'auto', color: "var(--tgui--section_header_text_color)" }}
                                                                                    size="1x"
                                                                                />
                                                                            </a>
                                                                        );
                                                                    } catch {

                                                                        return null; // Do not render the link if invalid
                                                                    }
                                                                })()
                                                            }

                                                            {isExpanded ? items.link : truncatedLink}</span>
                                                        {items.link.length > 50 && (
                                                            <div className="inline-flex items-center ml-2">
                                                                <button
                                                                    onClick={() => handleToggle(index)}
                                                                    className="text-blue-500 hover:underline mr-2"
                                                                >
                                                                    {isExpanded ? "See less" : "See more"}
                                                                </button>
                                                                {/* Custom Link Icon */}



                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm ">{items.charge}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.service}</td>
                                                    <td className="px-6 py-4 text-sm text-nowrap ">{items.name}</td>
                                                    <td className="px-6 py-4 text-sm text-nowrap">{items.date}</td>

                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            }



                        </div>
                    </div>
                </Section>
            </List>
        </>
    );
};

export default Smmhistory;
