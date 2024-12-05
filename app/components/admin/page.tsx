"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import axios from "axios";

const Admin = () => {

    const [adminMessage, setAdminMessage] = useState('')
    const [adminMessageFor, setAdminMessageFor] = useState('')
    const [promoCode, setpromoCode] = useState(null)
    const [promoBalance, setPromoBalance] = useState(null)

    const [data, setData] = useState([])

    const sendDeposit = async (did, uid) => {
        setData((prevData) => {
            return prevData.map((item) => {
                if (item.did === did) {
                    // If the IDs match, update the status
                    return { ...item, status: "Done" };
                }
                return item;
            });
        });
        try {

            const response = await axios.post('/api/all/sendDeposit', {
                did: did,
                uid: uid
            })
            if (response) {
                try {
                    await axios.post('/api/notification/setDeposit', {
                        // depositID: updatedItem.did,
                        bool: true,
                    });
                } catch (error) {
                    console.error("Error setting notification for deposit:", error);
                    // Remove from processed IDs if the request fails

                }
            };



        } catch (e) {
            console.error(e.message)
        }
    }

    const sendAdminMessage = async () => {
        if (adminMessageFor) {
            const { error } = await supabase
                .from('adminmessage')
                .insert([
                    {
                        message: adminMessage, // Replace with your dynamic value if needed
                        for: adminMessageFor, // Replace with the desired value for the "for" column
                        from: "Admin", // Replace with the desired value for the "from" column
                    }
                ]);

            if (error) {
                console.error("Error inserting into adminmessage:", error);
            } else {
                window.alert("inserted")
            }
        } else {
            const { error } = await supabase
                .from('adminmessage')
                .insert([
                    {
                        message: adminMessage, // Replace with your dynamic value if needed
                        for: "all", // Replace with the desired value for the "for" column
                        from: "Admin", // Replace with the desired value for the "from" column
                    }
                ]);

            if (error) {
                console.error("Error inserting into adminmessage:", error);
            } else {
                window.alert("inserted")
            }
        }

    }

    const setpromoCodef = async () => {
        const { error } = await supabase
            .from('promo')
            .insert([
                {
                    code: promoCode, // Replace with your dynamic value if needed
                    balance: promoBalance // Replace with the desired value for the "from" column
                }
            ]);

        if (error) {
            console.error("Error inserting into adminmessage:", error);
        } else {
            window.alert("inserted")
        }

    }


    useEffect(() => {

        const fetchDeposit = async () => {
            // Create a real-time channel for the 'orders' table
            const response = await axios.get('/api/all/fetchDeposit');

            setData(response.data.data)
        }
        fetchDeposit()

        const channel = supabase
            .channel("deposit_channel")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "deposit" }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state
                setData((prevData) => [payload.new, ...prevData]);
                //console.log(payload.new)
            })



            .subscribe();

        // Cleanup the subscription on component unmount
        return () => {
            channel.unsubscribe();
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount


    return (
        <>
            <div className=" p-1 bg-red-200">
                <ul>
                    {data.map((items, index) => (
                        <li key={index} className="flex w-11/12 p-3 mx-auto" style={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                            <div className="block grid place-content-center px-2">
                                <div className="text-3xl">{items.amount} ETB</div>
                                <div className="text-1xl ml-2">{items.pm} / {items.name}</div>
                                <button onClick={() => sendDeposit(items.did, items.uid)} className="px-4 m-3 ml-2 py-2 bg-red-100">Send</button>
                            </div>
                            <div className="block my-auto ml-auto">
                                <div className="bg-red-100 p-4 mx-auto w-2" style={{ borderRadius: '100px' }}></div>
                                <div className="text-center" style={{ lineHeight: '1' }}>{items.uid}</div>
                                <div className="text-center" style={{ lineHeight: '1' }}>{items.did}</div>
                                <div className="text-center mr-2 text-2xl  my-4">{items.status}</div>
                            </div>
                        </li>
                    ))}


                </ul >
            </div>
            <div className="w-screen bg-red-100 p-1">
                <input type="text" placeholder="message" onChange={(e) => setAdminMessage(e.target.value)} value={adminMessage} />
                <input type="text" placeholder="id" onChange={(e) => setAdminMessageFor(e.target.value)} value={adminMessageFor} />
                <button onClick={sendAdminMessage}>send</button>
            </div>
            <div className="w-screen bg-red-100 p-1">
                <input type="text" placeholder="code" onChange={(e) => setpromoCode(e.target.value)} value={promoCode} />
                <input type="text" placeholder="balance" onChange={(e) => setPromoBalance(e.target.value)} value={promoBalance} />
                <button onClick={setpromoCodef}>send</button>
            </div>
        </>
    );
}

export default Admin;