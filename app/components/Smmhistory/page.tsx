"use client";
import { List, Section, Text } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import axios from "axios";
import { useNot } from '../StatusContext';
import MyLoader from "../Loader/page";
import { faLink, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

const Smmhistory = () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [loadingd, setLoadingd] = useState(null);
    /* eslint-disable @typescript-eslint/no-unused-vars */
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
                    const { status, start_count, remains } = result[orderId];

                    //     // If the response contains status for the given orderId, update the relevant data
                    setData((prevData) =>
                        prevData.map((item) =>
                            item.oid === orderId
                                ? { ...item, status, start_count, remains } // Update relevant fields
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
        //https://adminv.paxyo.com/senda.php?ama=3&rbo=0&dvo=3&hid=330030&fd=111&tid=475&sa=deposit
        //ama -> session amount----get the balance using hid and name it session b
        //rbo -> session rdo---get the fd balance and name it session bb 
        //dvo -> session ddo--get the referfalcommision of the fd and name it sessio bbb
        //fd -> sesion fd--update the balance of the fd based on the refer 
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
                        .eq("uid", user.id) // FiltS by user id or another parameter as needed
                        .order('created', { ascending: false });

                    if (error) {
                        console.log(error);
                    } else {
                        setData(initialData); // Set the initial data
                        setLoader(false)
                        // Immediately call fetchOrderStatus for each order to fetch the initial status
                        initialData.forEach((item) => {
                            // Ensure we're only fetching for orders that are not "Completed" or "Cancelled"
                            if (["Pending", "In progress"].includes(item.status)) {


                                fetchOrderStatus(item.oid); // Fetch status immediately for non-completed orders
                            }
                        });

                        // Create intervals for polling, only for non-completed or non-cancelled orders
                        const intervals = initialData
                            .filter((item) => item.status !== "Canceled" && item.status !== "Completed") // Filter out completed/canceled orders

                            .map((item) => {

                                return setInterval(() => fetchOrderStatus(item.oid), 9000); // Polling only for non-completed orders every 2 seconds
                            });

                        // // Cleanup intervals when the component unmounts or when data changes
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
                        // Add the new order to the stats
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
                        if (["Pending", "In progress"].includes(payload.new.status) && !["Cancelled", "Completed"].includes(payload.new.status)) {

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
    }, []); // Emptdependency array ensures this effect runs only once on mount

    // const handleRefill = async (orderId) => {
    //     if (!orderId) {
    //         alert("Order ID is missing");
    //         return;
    //     }

    //     setLoadingd(orderId);

    //     try {
    //         const response = await fetch("../../api/smm/RefillButton", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ order: orderId }),
    //         });

    //         const data = await response.json();
    //         console.log("API Response:", data);

    //         if (response.ok) {
    //             alert("Refill request sent successfully!");
    //         } else {
    //             alert(`Error: ${data.error || "Something went wrong"}`);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("Failed to send refill request.");
    //     } finally {
    //         setLoadingd(false);
    //     }
    // };

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
                <div className='z-90   w-full absolute place-content-center grid place-content-end absolute  ' onClick={() => window.location.href = 'https://www.google.com'} style={{ margin: '1rem -0.9rem', fontSize: '0.8rem', height: '3rem', zIndex: 900, }} >
                    <div className="flex">

                        <FontAwesomeIcon icon={faTelegram} style={{ 'margin': '1.3rem 0.3rem', color: 'var(--tgui--section_header_text_color)' }} size="2x" />
                        <div className="font-sans inline mx-auto my-auto">Support</div>
                    </div>
                </div>
                <Section header={(
                    <>
                        <div className="tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-d0251b46536ac046 tgui-809f1f8a3f64154d tgui-266b6ffdbad2b90e tgui-8f63cd31b2513281 tgui-9c200683b316fde6">Order history
                        </div>

                    </>
                )} style={{ marginTop: '-0.5rem', border: "1px solid var(--tgui--section_bg_color)" }}>

                    <div style={{ width: "100%" }} className=" mx-auto">
                        {loader && <MyLoader />}

                        <div style={{ borderRadius: "10px", height: '31rem', width: '100%' }} className="scrollabler  w-full overflow-x-auto">

                            {!loader &&
                                <table style={{ width: "100%" }} className="   rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th> */}
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-nowrap text-left text-xs font-medium  uppercase tracking-wider">
                                                Starting From
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Remains</th>


                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Link</th>
                                            <th className="px-6 py-3 text-nowrap text-left text-xs font-medium  uppercase tracking-wider">
                                                Charge (ETB)
                                            </th>
                                            {/* <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Service</th> */}
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">Service</th>
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
                                                    {/* <td className="px-6 py-4 text-sm ">
                                                        <button
                                                            onClick={() => handleRefill(items.oid)}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                                            disabled={loadingd === items.oid}
                                                        >
                                                            {loadingd === items.oid ? "Processing..." : "Refill Order"}
                                                        </button>
                                                    </td> */}
                                                    <td
                                                        style={{
                                                            textShadow:
                                                                items.status === "Canceled" ? "2px 2px 29px red" :
                                                                    items.status === "Completed" ? "2px 2px 29px lime" :
                                                                        items.status === "Pending" ? "2px 2px 29px yellow" :
                                                                            items.status === "In progress" ? "2px 2px 29px blue" :
                                                                                undefined
                                                        }}
                                                        className="px-6 py-4 text-sm text-nowrap">{items.status}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.oid}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.start_from}</td>
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
                                                    {/* <td className="px-6 py-4 text-sm ">{items.service}</td> */}
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
            </List >
        </>
    );
};

export default Smmhistory;
