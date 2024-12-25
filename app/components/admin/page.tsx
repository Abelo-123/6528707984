"use client"
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'; // Import SweetAlert2
import MyLoader from "../Loader/page";

const Admin = () => {

    const [adminMessage, setAdminMessage] = useState('')
    const [adminMessageFor, setAdminMessageFor] = useState('')
    const [promoCode, setpromoCode] = useState(null)
    const [promoBalance, setPromoBalance] = useState(null)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState([])

    const sendDeposit = async (did, uid, amount) => {

        setData((prevData) => {
            return prevData.map((item) => {
                if (item.did === did) {
                    // If the IDs match, update the status
                    return { ...item, disabled: "true" };
                }
                return item;
            });
        });

        try {

            const { error } = await supabase.from('deposit').update({ status: 'Done' }).eq('did', did) // Condition for specific user

            if (error) {
                console.error(error.message)
            } else {

                const { error: findError } = await supabase.from('adminmessage').insert([
                    { for: uid, message: 'Done', from: 'Deposit' }
                ]) // Condition for specific user

                if (findError) {
                    console.error(findError.message)
                } else {
                    try {
                        const { error: findErrorB } = await supabase.from('deposit').update({ seen: true }).gt('did', 0); // Update all rows where `did` is greater than 0
                        if (findErrorB) {
                            console.error(findErrorB.message)
                        } else {
                            const { data: findData, error: findErrorD } = await supabase
                                .from("users")
                                .select('balance')
                                .eq("id", uid); // Pass 100 as a string


                            if (findErrorD) {
                                console.error(findErrorD.message)
                            } else {
                                const newbalance = findData[0].balance + amount

                                const { error: findErrorC } = await supabase
                                    .from("users")
                                    .update({ balance: newbalance })
                                    .eq("id", uid); // Pass 100 as a string
                                if (findErrorC) {
                                    console.error(findErrorC.message)
                                } else {
                                    setData((prevData) => {
                                        return prevData.map((item) => {
                                            if (item.did === did) {
                                                // If the IDs match, update the status
                                                return { ...item, status: "Done" };
                                            }
                                            return item;
                                        });
                                    });
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'The operation was successful.',
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                        customClass: {
                                            popup: 'swal2-popup',    // Apply the custom class to the popup
                                            title: 'swal2-title',    // Apply the custom class to the title
                                            confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                                            cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                                        }
                                    });
                                }
                            }


                        }
                    } catch (error) {
                        console.error("Error setting notification for deposit:", error);
                        // Remove from processed IDs if the request fails

                    }

                }
            }






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
                const { error: findErrorB } = await supabase.from('adminmessage').update({ seen: true }).gt('id', 0); // Update all rows where `did` is greater than 0
                if (findErrorB) {
                    console.error(findErrorB.message)
                } else {
                    window.alert("inserted")
                }
            }
        } else {
            const { error } = await supabase
                .from('adminmessage')
                .update([
                    {
                        message: adminMessage, // Replace with your dynamic value if needed
                        for: "all", // Replace with the desired value for the "for" column
                        from: "Admin", // Replace with the desired value for the "from" column
                    }
                ])
                .eq('for', 'all');


            if (error) {
                console.error("Error inserting into adminmessage:", error);
            } else {
                const { error: findErrorB } = await supabase.from('adminmessage').update({ seen: true }).gt('id', 0); // Update all rows where `did` is greater than 0
                if (findErrorB) {
                    console.error(findErrorB.message)
                } else {
                    window.alert("inserted")
                }
            }
        }

    }

    const setpromoCodef = async () => {
        const { data, error: err } = await supabase
            .from('promo')
            .select('*')
            .eq('code', promoCode)

        if (err) {
            window.alert("invalid code")
        } else {
            if (data.length > 1) {
                window.alert("taken code")
            } else {
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
        }

    }


    useEffect(() => {

        const fetchDeposit = async () => {
            // Create a real-time channel for the 'orders' table
            setLoader(true)
            const { data: fetchDeposit, error } = await supabase.from('deposit').select('*');
            // setDescription([response.data.success[0]])
            if (error) {
                console.error(error.message)
            } else {
                setData(fetchDeposit)
                setLoader(false)
            }


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
                    {loader && <MyLoader />}

                    {!loader && data.map((items, index) => (
                        <li key={index} className="flex w-11/12 p-3 mx-auto" style={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
                            <div className="block grid place-content-center px-2">
                                <div className="text-3xl">{items.amount} ETB  </div>
                                <div className="text-1xl ml-2">{items.pm} / {items.name}</div>
                                <button disabled={items.disabled === "true"} style={{ display: items.status == 'Done' ? 'none' : 'block' }} onClick={() => sendDeposit(items.did, items.uid, items.amount)} className="px-4 m-3 ml-2 py-2 bg-red-100"> {items.disabled == "true" ? (
                                    <>
                                        <button className="buttonload">
                                            <FontAwesomeIcon icon={faRefresh} className="spin" /> Loading
                                        </button>


                                    </>
                                ) : "Send"}</button>
                            </div>
                            <div className="block my-auto ml-auto">
                                <img className="p-4 mx-auto " style={{ borderRadius: '100px' }} src={items.username_profile} width="100px" height="100px" />
                                <div className="text-center" style={{ lineHeight: '1' }}>{items.uid} / {items.username}</div>

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