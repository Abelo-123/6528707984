"use client"
import { List, Select, Text, Input, Button, Section } from "@telegram-apps/telegram-ui";
import { useState, useEffect, useRef } from "react";
import { faClose, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUser } from "../UserContext";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'; // Import SweetAlert2
import MyLoader from "../Loader/page";
import { useNot } from '../StatusContext';
import axios from "axios";
import { supabase } from "@/app/lib/supabaseClient";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
const Deposit = () => {
    const [again, setAgain] = useState(true); // Initially set to true to show the container
    const [iframeVisible, setIframeVisible] = useState(false); // Control iframe visibility
    const [aamount, setaAmount] = useState('');
    const [iframeKey, setIframeKey] = useState(0); // Key to force iframe reload
    const aamountRef = useRef(''); // Create a ref to store the latest aamount value
    //const { userId } = useUser();  // Destructure userId from useUser hook
    const { setNotification } = useNot();
    const { userData, setUserData } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenn, setIsModalOpenn] = useState(false);
    const [isPreModalOpen, setIsPreModalOpen] = useState(false);
    const [pm, setPm] = useState(null)
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [inputColor, setInputColor] = useState(''); // State for dynamic color
    const [ag, setTg] = useState(false)
    const [data, setData] = useState<any[]>([]);  // Adjst the type based on your data structure
    const [disable, setDisable] = useState(false)
    const [loader, setLoader] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mo, setMo] = useState(false)
    const [but, setBut] = useState(true)
    // Function to open the modal
    // const openModal = () => {
    //     setIsModalOpen(true);

    // };
    useEffect(() => {
        const fetchDeposit = async () => {
            const { data: desposit, error: setError } = await supabase
                .from('panel')
                .select('minmax')
                .eq('owner', 6528707984)
                .eq('key', 'minmax')
                .single()

            if (setError) {
                console.error('Error fetching initial balance:', setError)
            } else {
                setUserData((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    deposit: desposit.minmax,
                    // Update the `deposit` field
                }));
                console.log(desposit.minmax)

            }
        }

        supabase
            .channel("panel")
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "panel", filter: `owner=eq.6528707984` }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state
                if (payload.new.key === 'minmax') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        deposit: payload.new.minmax,
                        // Update the `deposit` field
                    }))
                }
                // console.log(payload.new.value)


                if (payload.new.key === 'rate') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        rate: Number(payload.new.value),
                        // Update the `deposit` field
                    }))
                    // console.log(payload.new.value)

                }
                //if (payload.new.owner === 779060335 && payload.new.key === 'rate') {

                // console.log(payload.new.value)


                //cconsole.log(payload.new)
            })
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "panel", filter: `owner=eq.779060335` }, (payload) => {
                if (payload.new.key === 'rate') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        allrate: payload.new.allrate,
                        // Update the `deposit` field
                    }))
                }
            }).subscribe()
        fetchDeposit();

    }, [])

    const openPreModal = () => {
        setIsPreModalOpen(true);

    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setMo(false)
        setBut(true)
        setTg(false)
        setIframeVisible(false)
        setaAmount('')
    };

    const closePreModal = () => {
        setIsPreModalOpen(false);
        setTg(false)
        setBut(true)
        setMo(false)
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

        // Reset the idle timeout on each input change

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

                const did = Math.floor(10000 + Math.random() * 90000); // generates a 5-digit random number


                e.preventDefault()


                const { error } = await supabase.from('deposit').insert([
                    { did: did, uid: user.id, pm: pm, amount: amount, name: name, username: user.first_name, username_profile: userData.profile, father: 6528707984 }
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
        }
    }




    useEffect(() => {
        aamountRef.current = aamount;
    }, [aamount]);

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
                    // Fetch the initial balance from the database
                    const { data: initialData, error } = await supabase
                        .from('deposit')
                        .select('*')
                        .eq('uid', user.id)
                        .order('created', { ascending: false });

                    if (error) {
                        console.log(error);
                    } else {
                        setLoader(false)
                        setData(initialData);

                        // Set the initial data
                    }

                    // Subscribe to real-time changes


                };
                auth();
            }

        }


    }, []);

    // Generate iframe src dynamically based on the amount
    const generateIframeSrc = () => {
        if (parseInt(aamount) > 1) {
            return `https://chapaaa.netlify.app/chapa.html?amount=${aamount}`;
        }
        return ''; // Return an empty string if the amount is not valid
    };

    let newamount = 0;
    const sendAmount = async (doll, mess) => {
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

                newamount = Number(doll)
                const { data: findDataa, error: findErrorDaa } = await supabase
                    .from("users")
                    .select('balance')
                    .eq("id", user.id)
                    .single();
                // Pass 100 as a string


                if (findErrorDaa) {
                    console.error(findErrorDaa.message)
                } else {
                    const newbalance = Number(findDataa.balance + Number(doll))

                    const { error: findErrorCa } = await supabase
                        .from("users")
                        .update({ balance: newbalance })
                        .eq("id", user.id); // Pass 100 as a string


                    if (findErrorCa) {
                        console.error(findErrorCa.message)
                    } else {
                        setUserData((prevNotifi) => ({
                            ...prevNotifi, // Spread the previous state
                            balance: newbalance,
                            // Update the `deposit` field
                        }));
                        const did = Math.floor(10000 + Math.random() * 90000); // generates a 5-digit random number

                        const { error } = await supabase.from('deposit').insert([
                            { transaction: mess, did: did, uid: user.id, amount: Number(doll), name: userData.firstName, username: userData.username, username_profile: userData.profile, father: 6528707984 }
                        ]);
                        if (error) {
                            console.error(error.message)
                        } else {

                            // {items.status}</td>
                            //             <td className="px-6 py-4 text-sm  ">{items.did}</td>
                            //             <td className="px-6 py-4 text-sm  ">{items.date}</td>
                            //             <td className="px-6 py-4 text-sm  ">{items.transaction}</td>
                            //             <td className="px-6 py-4 text-sm  ">{items.amount}


                            setaAmount('')

                            // Extract year, month, and day

                            setData((prevData) => [

                                {
                                    status: "Done",
                                    did: did,
                                    Date: new Date(),
                                    transaction: mess,
                                    amount: Number(doll),
                                },
                                ...prevData, // Add previous data below the new data
                            ]);



                        }


                    }
                }
            }
        }

    }

    useEffect(() => {
        const handleMessage = async (event) => {
            // Validate the origin to ensure the message is from the expected source
            if (event.origin !== 'https://chapaaa.netlify.app') return;

            const { type, message } = event.data;

            // Handle different message types
            if (type === 'payment-success') {
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

                        //console.log(message); // e.g., "Payment was successful!"

                        setIsPreModalOpen(false)
                        //setAgain(true); // Set to true to show the container
                        setIframeVisible(false); // Make iframe visible again
                        Swal.fire({
                            title: 'Success!',
                            text: 'The deposit was successful.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                popup: 'swal2-popup',    // Apply the custom class to the popup
                                title: 'swal2-title',    // Apply the custom class to the title
                                confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                                cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                            }
                        }).then(async () => {
                            await axios.post('https://paxyo-bot-ywuk.onrender.com/api/sendToJohn', {
                                "type": "deposit",
                                "uid": user.first_name,
                                "amount": Number(newamount) || 70
                            });
                        });
                        setTg(false)
                        setBut(true)
                        setMo(false)
                        setaAmount("")
                        if (aamountRef.current) {
                            sendAmount(aamountRef.current, message);
                        } else {
                            console.log(0);
                        }
                    }
                }


            } else if (type === 'payment-failure' || type === 'payment-closed') {
                console.error(message); // Handle failure or closed event

                setAgain(true);
                setBut(true)
                setTg(true)
                // Hide container and show iframe
                setIframeVisible(false);


                // Hide iframe on failure or closed event

            } else if (type === 'payment-closed') {

                setAgain(true);
                setTg(true)
                setBut(true)
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
        //console.log(ee)
        setaAmount(ee)
        console.log(aamount)
        if (mo) {

            setTg(true)
            setAgain(true)
        }
        setIframeVisible(false)
    }
    const { useNotification } = useNot();

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
                            <div style={{ height: '85%' }} className='mt-24 '>
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
                {isPreModalOpen && (
                    <div
                        className="fixed  modal-pops inset-0  h-screen bg-black bg-opacity-75 grid content-center "
                        style={{ zIndex: 90000 }}
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

                            <div className="amount-container">

                                <Input
                                    header="Amount"
                                    type="number"
                                    className="w-full"
                                    placeholder="Enter amount"
                                    value={aamount}

                                    onChange={(e) => {
                                        setaAmount(e.target.value)
                                        setAmounts(e.target.value)
                                        setBut(true)

                                        setAgain(true)
                                    }
                                    }
                                />
                                <strong style={{ color: 'red' }}>
                                    {aamount !== '' && parseInt(aamount) <= userData.deposit && `The Minimum Deposit Amount is ${userData.deposit}`}
                                </strong>
                                <Button
                                    onClick={() => {
                                        setIframeKey((prevKey) => prevKey + 1)
                                        setIframeVisible(true)
                                        setBut(false)
                                        setLoading(true)
                                        setMo(true)
                                    }}
                                    className="w-full p-4"
                                    disabled={parseInt(aamount) <= userData.deposit || aamount === ''}
                                    style={{ display: but ? 'block' : 'none', marginTop: '10px', padding: '10px', backgroundColor: parseInt(aamount) >= userData.deposit ? 'var(--tgui--button_color)' : 'gray', color: 'white' }}
                                >
                                    {(ag && again) ? "Try Again" : "Continue"}
                                </Button>


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
                        className="fixed  modal-pops inset-0 absolute h-screen bg-black bg-opacity-25 grid content-center "
                        onClick={closeModal}
                        style={{ zIndex: 90000 }}
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
                            <Select header="Select" value={pm || ""} onChange={handleChange}>
                                <option value="">Select an option</option>
                                <option>Hello</option>
                                <option>Okay</option>
                            </Select>
                            <Input header="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" autoFocus />
                            <Input type="number" style={{ color: inputColor }} header="Amount" value={amount} onInput={(e) => handleDeposit(e)} placeholder="Enter the amount" />
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
                        className="fixed  modal-pops grid content-center inset-0  bg-opacity-75 grid content-center "
                        style={{ zIndex: 90000 }}
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
                <div className='z-90   w-full absolute place-content-center grid place-content-end absolute  ' onClick={() => window.location.href = 'https://t.me/paxyo_bot'} style={{ margin: '-0.5rem -1rem', fontSize: '0.8rem', height: '3rem', zIndex: 900, }} >
                    <div className="flex">

                        <FontAwesomeIcon icon={faTelegram} style={{ 'margin': '1rem 0.3rem', color: 'var(--tgui--section_header_text_color)' }} size="2x" />
                        <div className="font-sans inline mx-auto my-auto">Support</div>
                    </div>
                </div>
                <Section header="Deposit History" style={{ marginTop: '0rem', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div style={{ borderRadius: '10px', height: '26rem', width: '100%' }} className="scrollabler overflow-x-auto">

                        <table className=" min-w-full  rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  text-nowrap uppercase tracking-wider">Order Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Transaction</th>

                                    <th className="px-6 py-3 text-left text-nowrap text-xs font-medium  uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className=" ">
                                {data.map((items, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm  ">{items.did}</td>
                                        <td className="px-6 py-4 text-sm  ">{items.amount} Br</td>

                                        <td className="px-6 py-4 text-sm  ">{items.transaction}</td>
                                        <td className="px-6 py-4 text-sm text-nowrap ">{items.date}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {loader && <MyLoader />}

                    </div>
                </Section>

                <div className="w-full p-3 grid">
                    <Button
                        mode="filled"
                        size="l"
                        style={{
                            width: '100%', margin: 'auto auto'
                        }}
                        onClick={openPreModal}
                        before="+"
                    >
                        Deposit Now
                    </Button>
                </div>
            </List >
        </>
    );
}



export default Deposit;