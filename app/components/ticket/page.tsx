"use client"
import { List, Select, Text, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Swal from 'sweetalert2';
import MyLoader from "../Loader/page";
import { useNot } from '../StatusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
const Ticket = () => {
    const [selectedOption, setSelectedOption] = useState("1");
    const [subject, setSubject] = useState("");
    const [action, setAction] = useState("");
    const [orderId, setOrderId] = useState("");
    const [message, setMessage] = useState("");
    const [tickets, setTickets] = useState([]); // State to store fetched tickets
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [userId, setUserId] = useState(""); // State to store the user ID
    const { setNotification } = useNot();
    const { useNotification } = useNot();

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
                {
                    useNotification.notificationModal && (
                        <div style={{
                            zIndex: 9000, background: 'var(--tgui--section_bg_color)'
                        }} className=" modal-popp fixed inset-0 top-0 bottom-0 w-screen ">

                            {useNotification.notificationLoader && <MyLoader style={{ marginTop: '2rem' }} />}
                            <div style={{ height: '85%' }} >
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
                    <div style={{ borderRadius: "10px", height: '22rem', width: '100%' }} className="scrollabler  w-full overflow-x-auto">
                        <Text header="Submitted Tickets" />

                        <table className="min-w-full rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-nowrap text-left text-xs font-medium uppercase tracking-wider">Type</th>
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
                                                    ticket.status === "Answered" ? "2px 2px 29px lime" :
                                                        ticket.status === "Pending" ? "2px 2px 29px yellow" :
                                                            undefined
                                            }}>{ticket.status || "-"}</td>
                                        <td className="px-6 py-4 text-nowrap text-sm">{ticket.optionType == 1 ? "Human Support" : "AI Support"}</td>
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
                <Text style={{ fontSize: '0.7rem' }}>If you&apos;re interested in obtaining API access or reselling our services through a fully functional panel like this, we can provide you with the tools to start your own business. Contact us at support on telegram @Paxyo</Text>
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
                    =

                    <div
                        className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                        onClick={(e) => e.stopPropagation()}
                        style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                    // Prevent clicking inside the modal from closing it
                    >
                        <div
                            style={{ zIndex: 90000 }}
                            className="  text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>
                        <Select
                            className="m-4"
                            header="Support Type"
                            placeholder="Choose support"
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            <option value="1">Human Support</option>
                            <option value="2">AI Support</option>
                        </Select>
                        {selectedOption === "2" && (
                            <Select
                                header="Action"
                                value={action}
                                placeholder="Choose action"
                                onChange={(e) => setAction(e.target.value)}
                            >
                                <option value="cancel">Cancel</option>
                                <option value="speed">Speed</option>
                                <option value="refil">Refil</option>
                            </Select>
                        )}
                        {selectedOption === "1" && (
                            <Input header="Subject" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        )}
                        {selectedOption === "2" && (
                            <Input header="Order IDs" placeholder="Enter Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
                        )}
                        {selectedOption === "1" && (
                            <textarea
                                placeholder="Type message"
                                rows="10"
                                style={{
                                    margin: '10px',
                                    padding: '10px',
                                    width: '90%',
                                    color: 'black',
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
                    </div>
                </div>
            )}
        </>
    );
}

export default Ticket;