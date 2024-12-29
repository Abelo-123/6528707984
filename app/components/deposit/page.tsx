"use client"
import { List, Select, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState, useEffect, useRef } from "react";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUser } from "../UserContext";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'; // Import SweetAlert2
import MyLoader from "../Loader/page";
import { useNot } from '../StatusContext';
import { supabase } from "@/app/lib/supabaseClient";
const Deposit = () => {
    const [again, setAgain] = useState(true); // Initially set to true to show the container
    const [iframeVisible, setIframeVisible] = useState(false); // Control iframe visibility
    const [aamount, setaAmount] = useState('');
    const [iframeKey, setIframeKey] = useState(0); // Key to force iframe reload
    const aamountRef = useRef(''); // Create a ref to store the latest aamount value

    //const { userId } = useUser();  // Destructure userId from useUser hook

    const { setNotification } = useNot();

    const { userData } = useUser();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenn, setIsModalOpenn] = useState(false);
    const [isPreModalOpen, setIsPreModalOpen] = useState(false);
    const [pm, setPm] = useState(null)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [inputColor, setInputColor] = useState(''); // State for dynamic color
    const [ag, setTg] = useState(false)
    const [data, setData] = useState<any[]>([]);  // Adjust the type based on your data structure
    const [disable, setDisable] = useState(false)
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);

    };
    const openPreModal = () => {
        setIsPreModalOpen(true);

    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);

    };

    const closePreModal = () => {
        setIsPreModalOpen(false);
        setTg(false)
        setIframeVisible(false)
        setaAmount('')
    };

    const closeModall = () => {
        setIsModalOpenn(false);
    };

    const openModall = () => {
        setIsModalOpenn(true);
        if (inputColor == 'blue') {
            window.alert("150")
            setIsModalOpenn(false);
        }
    };
    const handleChange = (event) => {
        const value = event.target.value;
        setPm(value);   // Call the setPm() function
    };

    const handleDeposit = (e) => {
        const value = e.target.value;
        setAmount(value);

        // Change the color based on the value of the input
        if (value < 150) {


            setInputColor('black');  // Set the color to black when amount is less than 150
        } else {


            setInputColor('blue');  // Set the color back to blue otherwise
        }
    };
    const handleConfirm = async (e) => {
        setDisable(true)

        const did = Math.floor(10000 + Math.random() * 90000); // generates a 5-digit random number


        e.preventDefault()


        const { error } = await supabase.from('deposit').insert([
            { did: did, uid: userData.userId, pm: pm, amount: amount, name: name, username: userData.username, username_profile: userData.profile }
        ]);

        if (error) {
            console.error(error.message)
        } else {
            setPm(null)
            setName('')
            setAmount('')
            setIsModalOpen(false);
            setDisable(false)
            setIsModalOpenn(false);
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

    useEffect(() => {
        aamountRef.current = aamount;
    }, [aamount]);

    useEffect(() => {
        const auth = async () => {
            setLoader(true)
            // Fetch the initial balance from the database
            const { data: initialData, error } = await supabase
                .from('deposit')
                .select('*')
                .eq('uid', userData.userId);

            if (error) {
                console.log(error);
            } else {
                setLoader(false)
                setData(initialData);  // Set the initial data
            }

            // Subscribe to real-time changes
            supabase
                .channel(`deposit:uid=eq.${userData.userId}`)
                .on("postgres_changes", { event: "INSERT", schema: "public", table: "deposit" }, (payload) => {
                    //console.log("New order inserted:", payload.new);
                    // Add the new order to the state
                    setData((prevData) => [...prevData, payload.new]);
                    console.log(payload.new)

                })
                .on("postgres_changes", { event: "INSERT", schema: "public", table: "adminmessage" }, (payload) => {
                    //console.log("New order inserted:", payload.new);
                    // Add the new order to the state

                    if (payload.new.seen === true) {
                        setNotification((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            notificationLight: true
                            // Update the `deposit` field
                        }));
                    }
                    console.log(payload.new)

                })
                .on("postgres_changes", { event: "UPDATE", schema: "public", table: "deposit" }, (payload) => {
                    //console.log("New order inserted:", payload.new);
                    // Add the new order to the state
                    //console.log(payload.new)

                    const updatedItem = payload.new;

                    //console.log(payload.new)
                    if (payload.new.seen === true) {
                        setNotification((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            notificationLight: true
                            // Update the `deposit` field
                        }));
                    }

                    setData((prevData) => {
                        return prevData.map((item) => {
                            if (item.did === updatedItem.did) {
                                // If the IDs match, update the status
                                return { ...item, status: "Done" };
                            }
                            return item;
                        });
                    });

                })
                .subscribe();
        };

        auth();
    }, []);

    // Generate iframe src dynamically based on the amount
    const generateIframeSrc = () => {
        if (parseInt(aamount) > 1) {
            return `https://paxyo.com/chapa.html?amount=${aamount}`;
        }
        return ''; // Return an empty string if the amount is not valid
    };

    const sendAmount = async (doll) => {
        const { data: findDataa, error: findErrorDaa } = await supabase
            .from("users")
            .select('balance')
            .eq("id", 100)
            .single();
        // Pass 100 as a string


        if (findErrorDaa) {
            console.error(findErrorDaa.message)
        } else {
            const newbalance = Number(findDataa.balance + Number(doll))

            const { error: findErrorCa } = await supabase
                .from("users")
                .update({ balance: newbalance })
                .eq("id", 100); // Pass 100 as a string
            if (findErrorCa) {
                console.error(findErrorCa.message)
            } else {
                const did = Math.floor(10000 + Math.random() * 90000); // generates a 5-digit random number

                const { error } = await supabase.from('deposit').insert([
                    { did: did, uid: userData.userId, pm: 'Chapa', amount: Number(doll), status: 'Done', name: userData.firstName, username: userData.username, username_profile: userData.profile }
                ]);
                if (error) {
                    console.error(error.message)
                } else {
                    setaAmount('')
                }
            }
        }



    }

    useEffect(() => {
        const handleMessage = (event) => {
            // Validate the origin to ensure the message is from the expected source
            if (event.origin !== 'https://paxyo.com') return;

            const { type, message } = event.data;

            // Handle different message types
            if (type === 'payment-success') {
                console.log(message); // e.g., "Payment was successful!"
                setIsPreModalOpen(false)
                //setAgain(true); // Set to true to show the container
                setIframeVisible(false); // Make iframe visible again
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

                if (aamountRef.current) {
                    sendAmount(aamountRef.current);
                } else {
                    console.log(0);
                }


            } else if (type === 'payment-failure' || type === 'payment-closed') {
                console.error(message); // Handle failure or closed event

                setAgain(true);
                setTg(true)
                // Hide container and show iframe
                setIframeVisible(false);


                // Hide iframe on failure or closed event

            } else if (type === 'payment-closed') {

                setAgain(true);
                setTg(true)
                console.log(message); // e.g., "Payment popup closed."
                setIframeVisible(false);

                // Hide iframe on close

            }
        };

        // Add the message listener
        window.addEventListener('message', handleMessage);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const setAmounts = (ee) => {
        console.log(ee)
        setaAmount(ee)
    }

    return (
        <>
            <List
                style={{

                    padding: '5px',
                    height: '40rem',
                    position: 'relative',
                }}
            >

                {isPreModalOpen && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={closePreModal}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Make Deposit</h2>
                            <p className="mb-4">Enter the amount you want to deposit:</p>

                            <div className="amount-container">
                                <Input
                                    header="Amount"
                                    type="text"
                                    className="w-full"
                                    placeholder="Enter amount"
                                    value={aamount}
                                    onChange={(e) => setAmounts(e.target.value)}
                                />
                                <Button
                                    onClick={() => {
                                        setIframeKey((prevKey) => prevKey + 1)
                                        setIframeVisible(true)
                                        setLoading(true)
                                    }}
                                    className="w-full p-4"
                                    disabled={parseInt(aamount) <= 1 || aamount === ''}
                                    style={{ marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) > 1 ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                                >
                                    {(ag && again) ? "Try Again" : "Continue"}
                                </Button>

                                {aamount !== '' && parseInt(aamount) < 1 && "Must be greater than 50"}
                            </div>
                            <br />
                            <div className="iframe-container relative">
                                {loading && <MyLoader />}
                                {iframeVisible && (
                                    <iframe
                                        key={iframeKey} // Use key to force iframe reload
                                        src={generateIframeSrc()} // Dynamically set iframe src
                                        width="100%"
                                        height="310rem"
                                        onLoad={() => {
                                            setLoading(false)
                                        }}
                                        title="Embedded HTML"
                                        frameBorder="0"
                                    />
                                )}
                            </div>


                            {/* <button
                                onClick={openModal}
                                style={{ background: 'var(--tgui--button_color)' }}
                                className="bg-blue-500  text-white px-6 py-4 mx-auto w-10/12 rounded-md"
                            >
                                Pay manule
                            </button> */}
                        </div>
                    </div>
                )}
                {isModalOpen && (
                    <div
                        className="fixed  modal-pops inset-0 absolute h-screen bg-black bg-opacity-25 grid content-center z-50"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white mx-auto modal-pop lg:w-4/12 p-8 rounded-lg relative w-96"
                            onClick={(e) => e.stopPropagation()}
                            style={{ 'width': '90%', background: 'var(--tgui--bg_color)' }}
                        // Prevent clicking inside the modal from closing it
                        >
                            <div

                                className=" text-gray-500 absolute m-2 right-4 top-2 px-4 py-3 rounded-md"
                                onClick={closeModal}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold mb-4">Make Deposit</h2>
                            <p className="mb-4">Enter the amount you want to deposit:</p>
                            <Select header="Select" value={pm} onChange={handleChange}>
                                <option value="">Select an option</option>
                                <option>Hello</option>
                                <option>Okay</option>
                            </Select>
                            <Input header="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Write and clean me" autoFocus />
                            <Input type="number" style={{ color: inputColor }} header="Amount" value={amount} onInput={(e) => handleDeposit(e)} placeholder="Write and clean me" />
                            <div className="flex mt-6  justify-between">
                                <button
                                    disabled={inputColor == "blue" ? true : false}
                                    id="deposit"
                                    style={{ background: 'var(--tgui--button_color)' }}
                                    className=" w-full text-white px-6 py-4 rounded-md"
                                    onClick={openModall}
                                >
                                    Make Deposit
                                </button>

                            </div>
                        </div>
                    </div>
                )}
                {isModalOpenn && (
                    <div
                        className="fixed  modal-pops grid content-center inset-0  bg-opacity-75 grid content-center z-50"
                    >
                        <div style={{ height: '30rem', background: 'var(--tgui--bg_color)' }} className="mx-auto my-auto modal-pop relative  p-6 rounded-lg w-11/12">
                            <div
                                onClick={() => closeModall()}

                                className=" absolute right-8 text-gray-500 px-4 py-3 mx-auto rounded-md"
                            >
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                            <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-bold mb-4">Confirm Action</h2>
                            {amount} {pm} {name}
                            <div className="flex absolute bottom-6 left-0 right-0   w-full justify-end space-x-4">
                                <button
                                    disabled={disable === true}
                                    onClick={handleConfirm}
                                    style={{ background: 'var(--tgui--button_color)' }}
                                    className="bg-blue-500  text-white px-6 py-4 mx-auto w-10/12 rounded-md"
                                >
                                    {disable == true ? (
                                        <>
                                            <button className="buttonload">
                                                <FontAwesomeIcon icon={faRefresh} className="spin" /> Loading
                                            </button>


                                        </>
                                    ) : "Confirm"}</button>

                            </div>
                        </div>
                    </div>
                )}

                <Section header="Deposit History" style={{ marginTop: '-1rem', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div style={{ borderRadius: '10px', width: '100%' }} className="scrollabler overflow-x-auto">
                        {loader && <MyLoader />}
                        <table className=" min-w-full  rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Order Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Payment Methof</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y ">
                                {data.map((items, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm text-white ">{items.status}</td>
                                        <td className="px-6 py-4 text-sm text-white ">{items.did}</td>
                                        <td className="px-6 py-4 text-sm text-white ">{items.date}</td>
                                        <td className="px-6 py-4 text-sm text-white ">{items.pm}</td>
                                        <td className="px-6 py-4 text-sm text-white ">{items.amount}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>


                    </div>
                </Section>

                <div className="w-full p-3 grid">
                    <Button
                        mode="filled"
                        size="l"
                        style={{
                            width: '90%', marginTop: 'auto', position: 'absolute', bottom: '4rem'
                        }}
                        onClick={openPreModal}
                        before="+"
                    >
                        Make Deposit
                    </Button>
                </div>
            </List >
        </>
    );
}



export default Deposit;