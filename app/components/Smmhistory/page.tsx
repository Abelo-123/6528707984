/* eslint-disable @typescript-eslint/no-unused-vars */ // Disable 'no-unused-vars' for the entire file

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
import Swal from "sweetalert2";

const Smmhistory = () => {
    const [loadingd, setLoadingd] = useState(null);
    const [loader, setLoader] = useState(false);
    const [refillCooldowns, setRefillCooldowns] = useState<Record<string, number>>({});
    const [loadingRefill, setLoadingRefill] = useState<Record<string, boolean>>({}); // Track loading state for each order

    const { useNotification, setNotification } = useNot();
    const [userid, setUserId] = useState<number | null>(null);
    const [data, setData] = useState<any[]>([]); // Adjust the type based on your data structure
    const [isFetchingStatuses, setIsFetchingStatuses] = useState(false); // Flag to prevent overlapping executions

    // Fetch order status for each order
    const fetchOrderStatus = async (orderId: string) => {
        // Ensure the order is not already "refunded" before proceeding
        const order = data.find((item) => String(item.oid) === String(orderId));
        if (!order || order.status === "refunded") {
            console.log(`Skipping fetchOrderStatus for order ${orderId}, status is "refunded" or order not found.`);
            return;
        }

        // Check if the order's status is "refunded"
        if (order.status === "refunded") {
            console.log(`Skipping API call for order ${orderId}, status is "refunded".`);
            return;
        }

        // If the status is already "Completed" or "Canceled", skip the API call
        if (order.status === "Completed" || order.status === "Canceled") {
            console.log(`Skipping API call for order ${orderId}, status is already '${order.status}'.`);
            return;
        }

        // Proceed with the API call for other statuses
        const url = '../../api/smm/fetchStatus';
        try {
            const response = await axios.post(url, {
                orderId: orderId, // Sending orderId as JSON in the body
            });

            const result = response.data; // Axios response contains data directly

            if (result.status) {
                const { status, start_count, remains } = result;

                setData((prevData) =>
                    prevData.map((item) =>
                        item.oid === orderId
                            ? { ...item, status: result.status, start_count: result.start_count, remains: result.remains } // Update relevant fields
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
    };

    const fetchOrderStatusesConcurrently = async (orders: any[], maxConcurrent: number) => {
        if (isFetchingStatuses) {
            console.log("Already fetching statuses, skipping...");
            return; // Prevent overlapping executions
        }

        setIsFetchingStatuses(true); // Set the flag to indicate fetching has started

        const queue = [...orders.filter(order => ["Pending", "In progress", "Processing", "Partial"].includes(order.status))];
        const activeRequests: Promise<void>[] = [];

        const processQueue = async () => {
            while (queue.length > 0) {
                const order = queue.shift();
                if (order) {
                    await fetchOrderStatus(order.oid);
                }
            }
        };

        for (let i = 0; i < maxConcurrent; i++) {
            activeRequests.push(processQueue());
        }

        await Promise.all(activeRequests); // Wait for all requests to complete
        setIsFetchingStatuses(false); // Reset the flag after fetching is complete
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
                setUserId(user.id);
            }
        }
    }, []);

    useEffect(() => {
        // Load cooldowns from localStorage on component mount
        const storedCooldowns = localStorage.getItem("refillCooldowns");
        const now = Date.now();
        let validCooldowns: Record<string, number> = {};

        if (storedCooldowns) {
            const parsedCooldowns = JSON.parse(storedCooldowns);

            // Filter out expired cooldowns
            validCooldowns = Object.fromEntries(
                Object.entries(parsedCooldowns).filter(([orderId, cooldownEnd]) => cooldownEnd > now)
            );
        }

        // Only set valid cooldowns from storage, do not modify based on data/status
        setRefillCooldowns(validCooldowns);
    }, []); // Only run on mount

    useEffect(() => {
        // Save cooldowns to localStorage whenever they change
        localStorage.setItem("refillCooldowns", JSON.stringify(refillCooldowns));
    }, [refillCooldowns]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefillCooldowns((prevCooldowns) => {
                const updatedCooldowns = { ...prevCooldowns };
                Object.keys(updatedCooldowns).forEach((orderId) => {
                    if (updatedCooldowns[orderId] !== undefined && updatedCooldowns[orderId] <= Date.now()) {
                        // Remove cooldown entry when expired
                        delete updatedCooldowns[orderId];
                    }
                });
                return updatedCooldowns;
            });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleRefillClick = async (orderId: string) => {
        // Only allow if cooldown is undefined (never set)
        if (refillCooldowns[orderId] !== undefined) {
            console.log(`Cooldown is already set for order ${orderId}.`);
            return; // Exit early if cooldown is already set
        }

        setLoadingRefill((prev) => ({ ...prev, [orderId]: true })); // Set loading state for this order

        try {
            const response = await fetch(`/api/refill?order=${orderId}`, {
                method: 'GET',
            });

            const result = await response.json();

            if (result.error === "Refill is disabled for this service") {
                Swal.fire({
                    icon: 'error',
                    title: 'Refill Disabled',
                    text: 'Refill is disabled for this service.',
                });
                return; // Exit early if refill is disabled
            }

            if (result.error === "The order was completed or refill was requested less than 24 hours ago") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Refill Not Allowed',
                    text: 'Try requesting after 24 hours',
                });
                return; // Exit early if refill is not allowed
            }
            if (result.error === "Refill days are over") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Refill expired',
                    text: 'Refill days are over',
                });
                return; // Exit early if refill is not allowed
            }

            const now = Date.now();
            setRefillCooldowns((prevCooldowns) => {
                const updatedCooldowns = {
                    ...prevCooldowns,
                    [orderId]: now + 25 * 60 * 60 * 1000, // Set cooldown to exactly 24 hours
                };
                localStorage.setItem("refillCooldowns", JSON.stringify(updatedCooldowns)); // Save immediately
                return updatedCooldowns;
            });

            console.log(`Refill requested for order ${orderId}`);
        } catch (error) {
            console.error(`Failed to request refill for order ${orderId}:`, error);
        } finally {
            setLoadingRefill((prev) => ({ ...prev, [orderId]: false })); // Reset loading state
        }
    };

    const getCooldownTimeLeft = (orderId: string) => {
        const cooldownEnd = refillCooldowns[orderId];
        if (!cooldownEnd) return { hours: 0, minutes: 0, seconds: 0 };
        const timeLeft = Math.max(0, cooldownEnd - Date.now());
        const hours = Math.floor(timeLeft / 1000 / 60 / 60);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return { hours, minutes, seconds };
    };

    const parseDuration = (duration: string) => {
        if (typeof duration !== "string") {
            console.error("Invalid duration:", duration);
            return 0; // Return 0 if duration is not a string
        }

        // Adjust regex to handle cases like "14seconds" or "14 seconds"
        const match = duration.match(/(\d+)\s*(\w+)/);
        if (!match) return 0;

        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();

        switch (unit) {
            case "second":
            case "seconds":
                return value * 1000;
            case "minute":
            case "minutes":
                return value * 60 * 1000;
            case "hour":
            case "hours":
                return value * 60 * 60 * 1000;
            case "day":
            case "days":
                return value * 24 * 60 * 60 * 1000;
            default:
                return 0;
        }
    };

    const canShowRefillButton = (createdTime: string, duration: string | null) => {
        if (!duration) return false; // Return false if duration is null
        const createdTimestamp = parseInt(createdTime, 10); // Parse createdTime as a number
        if (isNaN(createdTimestamp)) return false; // Return false if parsing fails
        const now = Date.now();
        const durationMs = parseDuration(duration);
        return now - createdTimestamp <= durationMs; // Check if within the duration
    };

    const [expandedRow, setExpandedRow] = useState(null);
    const [expandedNameRow, setExpandedNameRow] = useState<number | null>(null);

    const handleToggle = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const handleNameToggle = (index: number) => {
        setExpandedNameRow(expandedNameRow === index ? null : index);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoader(true);
            // Fetch the initial data (orders) from Supabase or any other source
            const { data: initialData, error } = await supabase
                .from("orders")
                .select("*")
                .eq("uid", userid)
                .order('created', { ascending: false });

            if (error) {
                console.log(error);
            } else {
                // Ensure 'refill' is parsed as a boolean
                const parsedData = initialData.map((item) => ({
                    ...item,
                    refill: Boolean(item.refill), // Convert refill to a boolean
                }));
                setData(parsedData); // Set the parsed data
                setLoader(false);
                console.log(parsedData)
            }
        };

        fetch();
    }, [userid]); // Add 'userid' to the dependency array

    useEffect(() => {
        if (data.length > 0) {
            // Filter orders that need status updates
            const ordersToUpdate = data.filter(
                (item) => ["Pending", "In progress", "Processing", "Partial"].includes(item.status)
            );

            // Call the function to fetch statuses concurrently
            fetchOrderStatusesConcurrently(ordersToUpdate, 3); // Process up to 3 requests at once
        }
    }, [data, fetchOrderStatusesConcurrently]); // Add 'fetchOrderStatusesConcurrently' to the dependency array

    useEffect(() => {
        // Create a real-time channel for the 'orders' table
        const channel = supabase
            .channel("orders_channel")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders", filter: `uid=eq.393383708` }, (payload) => {
                setData((prevData) => [payload.new, ...prevData]);

                // If the new order status is not "Completed", call fetchOrderStatus
                if (payload.new.status !== "Completed" && payload.new.status !== "Canceled" && payload.new.status !== "refunded") {
                    fetchOrderStatus(payload.new.oid); // Fetch status for new order
                }
            })
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders", filter: `uid=eq.393383708` }, (payload) => {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.oid === payload.new.oid
                            ? { ...item, status: payload.new.status, start_count: payload.new.start_from, remains: payload.new.remains } // Update the status in the state
                            : item
                    )
                );

                // If the updated order's status is not "Completed", call fetchOrderStatus
                if (["Pending", "In progress", "Processing", "Partial"].includes(payload.new.status) && !["Cancelled", "Completed"].includes(payload.new.status)) {
                    fetchOrderStatus(payload.new.oid); // Fetch status for updated order
                }
            })
            .subscribe();

        // Cleanup the subscription on component unmount
        return () => {
            channel.unsubscribe();
        };
    }, [fetchOrderStatus]); // Add 'fetchOrderStatus' to the dependency array

    useEffect(() => {
        const updateCanceledOrders = async () => {
            // Filter out already refunded orders
            const canceledItems = data.filter(
                (item) => item.status === "Canceled" && item.uid === userid && item.status !== "refunded"
            );

            if (canceledItems.length === 0) {
                console.log("No eligible canceled items found for user 6528707984.");
                return;
            }

            for (const item of canceledItems) {
                console.log("Refunding:", item.oid);

                // Update the status to "refunded" in the database
                const { error: updateError } = await supabase
                    .from("orders")
                    .update({ status: "refunded" })
                    .eq("oid", item.oid);

                if (updateError) {
                    console.error(`Failed to update status for order ${item.oid}:`, updateError);
                    continue;
                }

                console.log(`Order ${item.oid} status updated to "refunded" in database.`);

                // Update the status to "refunded" in the state
                setData((prevData) =>
                    prevData.map((order) =>
                        order.oid === item.oid ? { ...order, status: "refunded" } : order
                    )
                );

                // Fetch the user's balance and refund the charge
                const { data: userData, error: userError } = await supabase
                    .from("users")
                    .select("balance")
                    .eq("id", item.uid)
                    .single();

                if (userError) {
                    console.error(`Failed to fetch balance for user ${item.uid}:`, userError);
                    continue;
                }

                const userBalance = userData?.balance || 0;

                const { error: refundError } = await supabase
                    .from("users")
                    .update({ balance: item.charge + userBalance })
                    .eq("id", item.uid);

                if (refundError) {
                    console.error(`Failed to refund charge for user ${item.uid}:`, refundError);
                } else {
                    console.log(`Refunded ${item.charge} to user ${item.uid}'s balance.`);
                }
            }
        };

        updateCanceledOrders();
    }, [data]);

    useEffect(() => {
        const handleNewOrder = (event: CustomEvent) => {
            const newOrder = event.detail;
            setData((prevData) => [newOrder, ...prevData]); // Add the new order to the top of the table
        };

        window.addEventListener("newOrder", handleNewOrder);

        return () => {
            window.removeEventListener("newOrder", handleNewOrder);
        };
    }, []);

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
                            zIndex: 9000, background: 'var(--tgui--section_bg_color)'
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
                    <div className="flex" style={{ zIndex: 1 }}>
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
                                            <th className="px-6 py-3 text-sm text-nowrap">Link</th>
                                            <th className="px-6 py-3 text-nowrap text-left text-xs font-medium  uppercase tracking-wider">
                                                Charge (ETB)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">Service</th>


                                            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider text-nowrap">Date</th>
                                            <th className="px-6 py-3 text-nowrap text-left text-xs font-medium  uppercase tracking-wider">
                                                Refill
                                            </th>
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
                                                                    items.status === "Completed" ? "2px 2px 29px lime" :
                                                                        items.status === "Pending" ? "2px 2px 29px yellow" :
                                                                            items.status === "In progress" ? "2px 2px 29px blue" :
                                                                                items.status === "Processing" ? "2px 2px 29px blue" :
                                                                                    items.status === "Partial" ? "2px 2px 29px blue" :
                                                                                        items.status === "refunded" ? "2px 2px 29px red" :
                                                                                            undefined
                                                        }}
                                                        className="px-6 py-4 text-sm text-nowrap">{items.status === "refunded" && "Cancelled" || items.status}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.oid}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.start_from}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.quantity}</td>
                                                    <td className="px-6 py-4 text-sm ">{items.remains}</td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <div style={{ display: 'flex' }}>
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
                                                                        } catch (error) {
                                                                            //console.error("Invalid link:", items.link, error); // Log invalid link
                                                                            return <span style={{ color: "red" }}>Invalid Link</span>; // Display fallback text
                                                                        }
                                                                    })()
                                                                }

                                                                <span>
                                                                    {isExpanded ? items.link : truncatedLink}
                                                                </span>
                                                            </span>
                                                            {items.link.length > 20 && (
                                                                <button
                                                                    style={{ display: 'inline' }}
                                                                    onClick={() => handleToggle(index)}
                                                                    className="text-blue-500 hover:underline ml-2"
                                                                >
                                                                    {isExpanded ? "See less" : "See more"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm ">{items.charge}</td>
                                                    <td className="px-6 py-4 text-sm text-nowrap "> {items.service} &nbsp;
                                                        <span>
                                                            {expandedNameRow === index ? items.name : items.name.length > 20 ? `${items.name.substring(0, 20)}...` : items.name}
                                                        </span>
                                                        {items.name.length > 20 && (
                                                            <button
                                                                onClick={() => handleNameToggle(index)}
                                                                className="text-blue-500 hover:underline ml-2"
                                                            >
                                                                {expandedNameRow === index ? "See less" : "See more"}
                                                            </button>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-nowrap">{items.date}</td>
                                                    <td className="px-6 py-4 text-sm text-nowrap ">
                                                        {Boolean(items.refill) && (
                                                            <>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevent triggering other click events
                                                                        // Only allow refill if cooldown is undefined and status is "Completed"
                                                                        if (refillCooldowns[items.oid] === undefined && items.status === "Completed") {
                                                                            handleRefillClick(items.oid); // Only trigger refill if no cooldown exists
                                                                        } else if (refillCooldowns[items.oid]) {
                                                                            console.log(`Cooldown already active for order ${items.oid}.`);
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        backgroundColor:
                                                                            loadingRefill[items.oid]
                                                                                ? "orange" // Loading state
                                                                                : refillCooldowns[items.oid] > Date.now()
                                                                                    ? "gray" // Cooldown period
                                                                                    : items.status === "Completed" && refillCooldowns[items.oid] === undefined
                                                                                        ? "blue" // Enabled after cooldown
                                                                                        : "rgba(0, 0, 0, 0.5)",
                                                                        color: "white",
                                                                        padding: "0.5rem 1rem",
                                                                        borderRadius: "5px",
                                                                        border: "none",
                                                                        cursor:
                                                                            loadingRefill[items.oid] ||
                                                                                refillCooldowns[items.oid] > Date.now() ||
                                                                                items.status !== "Completed"
                                                                                ? "not-allowed"
                                                                                : "pointer",
                                                                    }}
                                                                    disabled={
                                                                        loadingRefill[items.oid] ||
                                                                        refillCooldowns[items.oid] > Date.now() ||
                                                                        items.status !== "Completed"
                                                                    }
                                                                >
                                                                    {loadingRefill[items.oid]
                                                                        ? "Loading..." // Show loading state
                                                                        : refillCooldowns[items.oid] > Date.now()

                                                                            ? `${getCooldownTimeLeft(items.oid).hours}h ${getCooldownTimeLeft(items.oid).minutes}m ${getCooldownTimeLeft(items.oid).seconds}s` // Show timer
                                                                            : "Refill"}
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
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

/* eslint-enable @typescript-eslint/no-unused-vars */ // Re-enable 'no-unused-vars' if needed

export default Smmhistory;

