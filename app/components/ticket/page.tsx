"use client"
import { List, Select, Text, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Swal from 'sweetalert2';

const Ticket = () => {
    const [selectedOption, setSelectedOption] = useState("1");
    const [subject, setSubject] = useState("");
    const [action, setAction] = useState("");
    const [orderId, setOrderId] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState([]); // State to store fetched tickets
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [userId, setUserId] = useState(""); // State to store the user ID

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
                if (user && user.id) {
                    setUserId(user.id.toString()); // Store the user ID as a string
                }
            }
        };

        return () => {
            document.body.removeChild(script); // Cleanup script on component unmount
        };
    }, []);

    useEffect(() => {
        const fetchTickets = async () => {
            const { data, error } = await supabase
                .from("ticket")
                .select("*")
                .order("time", { ascending: false }); // Sort by time in descending order
            if (error) {
                console.error("Error fetching tickets:", error);
            } else {
                setTickets(data);
            }
        };

        fetchTickets();

        const channel = supabase
            .channel('realtime:ticket')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'ticket', filter: `uid=eq.${userId}` }, (payload) => {
                console.log("Realtime event received:", payload); // Debugging log
                fetchTickets(); // Re-fetch tickets on any change
            })
            .subscribe((status) => {
                console.log("Subscription status:", status); // Debugging log
            });

        return () => {
            supabase.removeChannel(channel); // Cleanup subscription on component unmount
        };
    }, []); // Fetch tickets and set up subscription when the component mounts

    const handleSubmit = async () => {
        const ticketData = {
            subject: selectedOption === "1" ? subject : null,
            action: selectedOption === "2" ? action : null,
            orderId: selectedOption === "2" ? orderId : null,
            message: selectedOption === "1" ? message : null,
            optionType: selectedOption, // Add selected option to the ticket data
            uid: userId, // Include the user ID
        };

        const { error } = await supabase.from("ticket").insert([ticketData]);

        if (error) {
            console.error("Error submitting ticket:", error);
            alert("Failed to submit ticket. Please try again.");
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Ticket submitted successfully!',
            });
            setTickets((prevTickets) => [...prevTickets, ticketData]); // Update the table with the new ticket
            setIsModalOpen(false); // Close the modal after submission
        }
    };

    return (
        <>
            <List
                style={{
                    padding: '5px',
                    height: '40rem',
                    position: 'relative',
                }}
            >
                <Button
                    color="primary"
                    style={{
                        width: '100%',
                        margin: '1rem auto 0 auto', // Center horizontally
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    Open Ticket Form
                </Button>
                <Section style={{ marginTop: '1rem', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div style={{ borderRadius: "10px", height: '31rem', width: '100%' }} className="scrollabler  w-full overflow-x-auto">
                        <Text header="Submitted Tickets" />

                        <table className="min-w-full rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-nowrap tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                    {/* <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Message</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket, index) => (
                                    <tr
                                        key={index}
                                    // style={{
                                    //     backgroundColor: ticket.status === "Pending" ? "rgba(0, 132, 255, 0.52)" : ticket.status === "done" ? "lightgreen" : "transparent",
                                    // }}
                                    >
                                        <td className="px-6 py-4 text-sm"

                                            style={{
                                                textShadow:
                                                    ticket.status === "done" ? "2px 2px 29px lime" :
                                                        ticket.status === "Pending" ? "2px 2px 29px yellow" :
                                                            undefined
                                            }}>{ticket.status || "-"}</td>
                                        <td className="px-6 py-4 text-sm">{ticket.optionType}</td>
                                        <td className="px-6 py-4 text-sm">{ticket.subject || "-"}</td>
                                        <td className="px-6 py-4 text-sm">{ticket.action || "-"}</td>
                                        <td className="px-6 py-4 text-sm">{ticket.orderId || "-"}</td>
                                        <td className="px-6 py-4 text-sm text-nowrap">{ticket.created_at || "-"}</td>
                                        {/* <td className="px-6 py-4 text-sm">{ticket.message || "-"}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>
            </List>

            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed', // Changed to fixed for proper positioning
                        top: 0, // Ensure modal covers the entire viewport
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                        display: 'flex', // Center modal content
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <button
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '4rem',
                            cursor: 'pointer',
                            color: 'white',
                        }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        &times;
                    </button>
                    <Section
                        style={{
                            backgroundColor: 'white', // Ensure modal content is visible
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--tgui--section_bg_color)',
                            width: '90%', // Adjust width for responsiveness
                            maxWidth: '500px', // Limit maximum width
                        }}
                    >
                        <Select
                            header="Support Type"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="1">Human Support</option>
                            <option value="2">AI Support</option>
                        </Select>
                        {selectedOption === "2" && (
                            <Select
                                header="Action"
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                            >
                                <option value="cancel">Cancel</option>
                                <option value="speed">Speed</option>
                                <option value="refil">Refil</option>
                            </Select>
                        )}
                        {selectedOption === "1" && (
                            <Input header="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        )}
                        {selectedOption === "2" && (
                            <Input header="Order IDs" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                        )}
                        {selectedOption === "1" && (
                            <textarea
                                placeholder="Type message"
                                rows="10"
                                style={{
                                    margin: '10px',
                                    padding: '10px',
                                    width: '90%',
                                    border: '3px solid darkblue',
                                    borderRadius: '7px',
                                }}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        )}
                        <Button
                            color="primary  ml-auto"
                            style={{
                                width: '100%',
                                margin: '1rem auto 0 auto',
                                borderRadius: '0.5rem',
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                            }}
                            onClick={handleSubmit}
                        >
                            Send
                        </Button>
                    </Section>
                </div>
            )}
        </>
    );
}

export default Ticket;