"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, Spinner, List, Text, Input } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faClose, faRotateBackward, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { useUser } from '../UserContext'; // Adjust the path as necessary
import { supabase } from '../../lib/supabaseClient'
import { useNot } from '../StatusContext';
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'; // Import SweetAlert2
import MyLoader from '../Loader/page';

const iconMap = {
    youtube: faYoutube,
    facebook: faFacebook,
    twitter: faXTwitter,
    tiktok: faTiktok,
    instagram: faInstagram,
    linkedin: faLinkedin,
    whatsapp: faWhatsapp,
    spotify: faSpotify,
    telegram: faTelegram,
    twitch: faTwitch,
    vk: faVk,
    search: faSearch,
    discord: faDiscord
};

const Smm = () => {
    const { setNotification } = useNot();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState([])
    const [category, setCategory] = useState([])
    const [service, setService] = useState([])
    const [chosen, setChosen] = useState<string | any>([])
    const [icon, setIcon] = useState({ i: iconMap.youtube, c: '', n: '' });
    const [cat, setCat] = useState(false)
    const [ser, setSer] = useState(false)
    const [bc, setBc] = useState('')
    //const [status, setStatus] = useState('')
    const [bcfor, setBcfor] = useState('')
    const [mediaload, setMediaload] = useState(true);
    const [charge, setCharge] = useState(0.0);
    const [theRate, settherate] = useState(0.0);
    const [link, setLink] = useState(null);
    const [quantity, setQuantity] = useState(null);
    // Replace with your bot token
    const { setUserData, userData } = useUser();
    //const [checkname, setCheckname] = useState('')
    //const [authmessage, setAuthMsg] = useState('')
    const [id, setId] = useState('')
    const [labelel, setLabel] = useState('')
    //const [ls, setLs] = useState('')
    const [modalA, showModalA] = useState(false)
    const [modalB, showModalB] = useState(false)
    const [searchh, readySearch] = useState(false)
    // const [search, setSearch] = useState('');

    const [searchhh, setSearchh] = useState('');
    const [servicess, setServicess] = useState([]); // All services
    const [filteredServices, setFilteredServices] = useState([]); // Filtered services
    const [description, setDescription] = useState("")

    const [promoModal, setpromoModal] = useState(false)

    const [promoCode, setPromoCode] = useState('')

    const [disable, setDisable] = useState(false)
    const [loader, showLoad] = useState(false)

    const [minn, setMin] = useState(0)
    const [maxx, setMax] = useState(0)
    // const [marq, setMarq] = useState('')






    // useEffect(() => {
    //     const fetchDepo = async () => {
    //         const { data: seeDataa, error: seeErora } = await supabase
    //             .from('adminmessage')
    //             .select('seen')
    //             .eq('seen', true);

    //         if (seeErora) {
    //             console.error('Error fetching initial balance:', seeErora);
    //         } else {
    //             if (seeDataa.length >= 1) {
    //                 setNotification((prevNotification) => ({
    //                     ...prevNotification, // Spread the previous state
    //                     notificationLight: true,
    //                     // Update the `deposit` field
    //                 }));
    //                 console.log("there admin")
    //             } else {
    //                 console.log("no admin message")
    //             }
    //         }
    //     }
    //     fetchDepo()
    // }, [])
    useEffect(() => {
        const auth = async () => {
            // Fetch the initial balance from the database



            // const { data, error } = await supabase
            //     .from('users')
            //     .select('balance')
            //     .eq('id', userData.userId)
            //     .single(); // Get a single row

            // if (error) {
            //     console.error('Error fetching initial balance:', error);
            // } else {
            //     //setBalance(data.balance); // Set initial balance
            // }

            const { data: seeData, error: seeEror } = await supabase
                .from('adminmessage')
                .select('message')
                .eq('for', userData.userId)
                .eq('father', userData.father)
                .eq('seen', true)

            if (seeEror) {
                console.error('Error fetching initial balance:', seeEror);
            } else {
                if (seeData.length >= 1) {
                    setNotification((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        notificationLight: true,
                        // Update the `deposit` field
                    }));
                } else {
                    console.log("not")
                }
            }
            //const forCondition = userData?.userId || "for";





            // } 31013959



            // Subscribe to real-time changes

            supabase
                .channel('adminmessage')
                .on("postgres_changes", { event: "INSERT", schema: "public", table: "adminmessage" }, (payload) => {
                    //console.log("New order inserted:", payload.new);
                    // Add the new order to the state

                    if ((Number(payload.new.for) === userData.userId && payload.new.father === userData.father) && payload.new.seen === true) {
                        setNotification((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            notificationLight: true
                            // Update the `deposit` field
                        }));
                        // console.log(payload.new)
                    }
                })
                .subscribe();
        };

        auth();
    }, []);

    useEffect(() => {
        const auth = async () => {
            // Fetch the initial balance from the database





            const { data: seeData, error: seeEror } = await supabase
                .from('deposit')
                .select('seen')
                .eq('uid', userData.userId)
                .eq('seen', true)

            if (seeEror) {
                console.error('Error fetching initial balance:', seeEror);
            } else {
                if (seeData.length >= 1) {
                    setNotification((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        notificationLight: true,
                        // Update the `deposit` field
                    }));
                } else {
                    console.log("not")
                }
            }

            // Subscribe to real-time changes


        };

        auth();
    }, []);


    useEffect(() => {
        // Load the Telegram Web App JavaScript SDK
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
                setUserData({
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userId: user.id,
                    profile: user.photo_url,

                });
                const storageKey = `userdata_name_${user.id}`; // Unique key for each user (or mini-app)

                const userNameFromStorage = localStorage.getItem(storageKey);


                if (userNameFromStorage) {
                    //setAuthMsg(`User data already exists in localStorage: ${userNameFromStorage}`);
                    console.log('User data already exists in localStorage:', userNameFromStorage)
                    return; // Do not call the API if the data is already set
                } else {
                    if (user) {


                        try {


                            const { error } = await supabase
                                .from('users')
                                .insert([
                                    { name: user.first_name, username: user.username, profile: user.photo_url, id: user.id }
                                ]);

                            if (error) {
                                console.error(error.message)
                            }

                            const userName = user.username;

                            // Set user data in localStorage with a unique key
                            localStorage.setItem(storageKey, userName);
                            // Store the name with a unique key
                            //const storedData = localStorage.getItem(`userdata_name_${user.id}`);

                            //setLs(`new set ${storedData}`)
                            // Use the name from the response
                        } catch (error) {
                            console.error("Error adding user:", error);
                        }
                    }
                }

            } else {
                console.error("Telegram Web App API not loaded");
            } // Adjust timeout as necessary


        };


        // const fetchUserProfilePhotos = async (userid) => {
        //     try {
        //         const response = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userid}`);

        //         if (response.data.ok) {
        //             const file_id = response.data.result.photos[0]?.[0].file_id; // Access the first photo in the first array

        //             const resp = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${file_id}`);

        //             if (resp.data.ok) {

        //                 setUserData((userData) => ({ ...userData, profile: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${resp.data.result.file_path}` }))

        //             }
        //             // Wrap it in an array to match the existing state structure
        //         }

        //     } catch (error) {
        //         console.error("Error fetching user profile photos:", error);
        //     }
        // };

        return () => {

            document.body.removeChild(script);

        };
    }, []);

    useEffect(() => {
        const fetchDescc = async () => {

            const ser = chosen.service;
            showLoad(true)
            const { data, error } = await supabase.from('desc').select('description').eq('service', ser);
            // setDescription([response.data.success[0]])
            if (error) {
                console.error(error.message)
            } else {
                showLoad(false)
                setDescription(data[0].description)
            }

        }
        fetchDescc()
    }, [id]); // Effect depends on both chose and chose

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal




    useEffect(() => {


        async function fetchService() {
            try {
                const response = await axios.get('/api/smm/fetchService');

                setServices([response]);
                console.log(response)
                if (response) {
                    setMediaload(false)
                    function getCategory() {


                        setBcfor('Youtube')
                        setBc('var(--tgui--section_header_text_color)')
                        setCat(true)

                        setIcon(() => {
                            return ({ i: iconMap.youtube, c: '#ff0000', n: 'Youtube' })
                        })

                        setCategory(
                            response.data.response
                                .filter((datas) => datas.category.includes('YouTube')) // Filter by name
                                .reduce((unique, datas) => {
                                    // Check if the name is already in the unique array
                                    if (!unique.some((item) => item.category === datas.category)) {
                                        unique.push(datas); // Add unique items to the array
                                    }
                                    return unique;
                                }, []) // Initialize with an empty array to accumulate unique values
                        );

                    }
                    getCategory()

                }
            } catch (error) {
                console.error('Error feching data:', error);
            }
        }


        //const storedData = localStorage.getItem(`userdata_name_${userData.userId}`);

        //setLs(storedData)


        fetchService()
    }, [])

    function getCategory(name, color, faicon, names) {
        setSer(false)
        setId(null)
        setChosen(null)
        setDescription(null)
        setBcfor(name)
        setBc('var(--tgui--section_header_text_color)')
        setCat(true)

        setIcon(() => {
            return ({ i: faicon, c: color, n: names })
        })

        setCategory(
            services[0].data.response
                .filter((datas) => datas.category.includes(name)) // Filter by name
                .reduce((unique, datas) => {
                    // Check if the name is already in the unique array
                    if (!unique.some((item) => item.category === datas.category)) {
                        unique.push(datas); // Add unique items to the array
                    }
                    return unique;
                }, []) // Initialize with an empty array to accumulate unique values
        );
    }

    function getService(name, data) {
        setId(null)
        setChosen(data)
        setSer(true)
        setDescription(null)
        showModalA(false)

        const ser = services[0].data.response.filter((datas) => datas.category.includes(name))


        return setService(ser)
    }

    function setChose(data) {
        setId(data.name)
        setSer(true)
        setChosen(data)
        showModalB(false)
        settherate(data.rate)
        setMin(data.min)
        setMax(data.max)
        setLabel(`Min: ${data.min} Max: ${data.max}`)
    }

    const handleInput = (e) => {
        setQuantity(e.target.value)
        const inputValue = e.target.value;
        setCharge(Number((inputValue * theRate / userData.rate).toFixed(2)))
        // Perform the calculation
    };

    const handleOrder = async () => {
        if (quantity % 10 !== 0) {
            Swal.fire({
                title: 'Invalid Quantity',
                text: 'Quantity must be a multiple of 10.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
            // } else if (quantity > 10000) {
            //     alert("to big")
        } else if (link == null || link.trim() === '') {
            Swal.fire({
                title: 'Missing Information',
                text: 'No link provided. Please complete all required fields',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
        } else if (quantity == null) {
            Swal.fire({
                title: 'Missing Information',
                text: 'No Quantity provided. Please complete all required fields',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
        } else if (link == null && quantity == 0) {
            Swal.fire({
                title: 'Missing Information',
                text: 'No Link And Quantity provided. Please complete all required fields',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
        } else if (minn > quantity || minn < quantity || (minn > quantity || minn < quantity)) {
            Swal.fire({
                title: 'Invalid Quantity',
                text: `The quantity must be between ${minn} and ${maxx}.`,
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
        } else if (charge > userData.balance) {
            Swal.fire({
                title: 'Insufficient Balance',
                text: 'Not enough balance to complete this order. Please recharge and try again.',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal2-popup',    // Apply the custom class to the popup
                    title: 'swal2-title',    // Apply the custom class to the title
                    confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                    cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                }
            });
        }
        else {
            try {
                setDisable(true)

                const response = await axios.post('/api/smm/addOrder', {
                    username: "userData.firstName",
                    service: chosen.service,
                    link: link,
                    quantity: quantity,
                    charge: charge,
                    refill: chosen.refill,
                    panel: 'smm',
                    name: id,
                    category: chosen.category,
                    id: userData.userId
                });
                if (response) {
                    setIsModalOpen(false);
                    setDisable(false)
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
            } catch (e) {
                console.error(e.message)
            }

        }


    }


    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/smm/fetchService');

                setServicess([response.data]); // Store all services
                setFilteredServices([response.data]); // Initially, show all services
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []); // Empty dependency array means this effect runs only once

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchh(value);
    };

    // Handle input change and filter services by the service id
    useEffect(() => {
        // Debounced search logic
        const timeout = setTimeout(() => {
            if (searchhh) {
                const filtered = servicess[0].response.filter((item) =>
                    item.service.toString().includes(searchhh)
                );

                const sortedFiltered = filtered.sort((a, b) => {
                    const aService = a.service.toString();
                    const bService = b.service.toString();

                    const aMatch = aService === searchhh;
                    const bMatch = bService === searchhh;

                    if (aMatch && !bMatch) {
                        return -1; // "a" should come first if it's an exact match
                    }
                    if (!aMatch && bMatch) {
                        return 1; // "b" should come first if it's an exact match
                    }

                    return aService.localeCompare(bService); // Otherwise, sort lexicographically
                });

                setFilteredServices(sortedFiltered);
            } else {
                setFilteredServices([]);
            }
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timeout); // Clear timeout if input changes quickly
    }, [searchhh, servicess]);

    const clickedSearch = (service) => {
        setChose(service);
        readySearch(false);
        settherate(service.rate);
        setIcon(() => {
            return { i: iconMap.search, c: "white", n: search };
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuantity(null)
        setCharge(0)
    };

    const { useNotification } = useNot();

    const checkPromo = async () => {
        try {
            const { data: balance, error } = await supabase
                .from('promo')
                .select('balance')
                .eq('code', promoCode)
                .single();

            if (error) {
                window.alert("invalid code")
            } else {
                const pb = balance.balance
                const { data, error } = await supabase
                    .from('promo')
                    .select('*')
                    .eq('code', promoCode)
                    .ilike('users', `%${userData.userId}%`); // Check if '100' exists surrounded by commas

                if (error) {
                    window.alert("invalid code")
                }

                if (data.length > 0) {
                    window.alert("contained")
                } else {
                    // Update the "balance" column in the "users" table
                    const { data: rowss, error: fetchErrore } = await supabase
                        .from('users')
                        .select('balance')
                        .eq('id', userData.userId)
                        .single();  // Increment balance by 200

                    if (fetchErrore) {
                        console.error(fetchErrore.message)
                    } else {
                        const bala = rowss.balance;

                        const { data: rows, error: fetchError } = await supabase
                            .from('promo')
                            .select('users')
                            .eq('code', promoCode)
                            .single();  // Increment balance by 200

                        if (fetchError) {
                            window.alert("invalid code")
                        }

                        const currentArray = rows.users || [];

                        // Step 2: Append the new value ('sd') to the array
                        const updatedArray = `${currentArray}, ${userData.userId}`;

                        // Update the "users" column in the "promo" table
                        const { error: updateError } = await supabase
                            .from('promo')
                            .update({ users: updatedArray })
                            .eq('code', promoCode);

                        if (updateError) {
                            throw new Error(`Error updating array: ${updateError.message}`);
                        } else {
                            const { error } = await supabase
                                .from('users')
                                .update({ balance: Number(Number(bala) + Number(pb)) }) // Increment balance
                                .eq('id', userData.userId); // Add WHERE clause for id = 100
                            if (error) {
                                console.error('Error updating balance:', error.message);
                            }
                        }
                    }


                }
            }






        } catch (err) {
            console.error('Error:', err.message);
        }
    }


    useEffect(() => {
        const fetchRate = async () => {


            const { data: rate, error: fetchError2 } = await supabase
                .from('panel')
                .select('value')
                .eq('father', userData.father)
                .eq('key', 'rate')
                .single();  // Increment balance by 200

            if (fetchError2) {
                console.log(fetchError2.message)
            } else {
                setUserData((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    rate: Number(rate.value),
                    // Update the `deposit` field
                }))
            }
        }
        const fetchDisable = async () => {


            const { data: rate, error: fetchError2 } = await supabase
                .from('panel')
                .select('bigvalue')
                .eq('father', userData.father)
                .eq('key', 'disabled')
                .single();  // Increment balance by 200

            if (fetchError2) {
                console.log(fetchError2.message)
            } else {
                setUserData((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    disabled: rate.bigvalue,
                    // Update the `deposit` field
                }))
            }
        }
        fetchRate();
        fetchDisable();
    }, [])

    useEffect(() => {
        supabase
            .channel("panel")
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "panel" }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state
                if (payload.new.father === userData.father && payload.new.kew === 'rate') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        rate: payload.new.value,
                        // Update the `deposit` field
                    }))
                    // console.log(payload.new.value)

                }
                //console.log(payload.new)
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'panel' }, (payload) => {

                if (payload.new.father === userData.father && payload.new.key === 'disabled') {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        disabled: payload.new.bigvalue,
                        // Update the `deposit` field
                    }))
                    console.log(payload.new.bigvalue)
                }
            })



            .subscribe();


    }, [])



    return (
        <>
            <List>
                {/* {authmessage}<br /> */}
                {/* {<button onClick={() => {
                localStorage.clear();

            }}>
                Clean
            </button>}<br />
            local data:{ls}<br /> */}
                {/* <button className="p-2 bg-red-100" onClick={() => setpromoModal(true)}>
                
                promo</button> */}

                {searchh && (
                    <div
                        style={{ background: 'var(--tgui--section_bg_color)', zIndex: 9000 }}
                        className="modal-popp  fixed overflow-y-hidden min-w-screen top-0 bottom-0  "
                    >


                        <div className="p-3  gap-5 grid content-start w-screen h-auto">
                            <div className=" p-2">
                                <input
                                    id="search"
                                    style={{ background: ' var(--tgui--section_bg_color)', borderBottom: '1px solid var(--tgui--accent_text_color)' }}
                                    type="text"
                                    value={searchhh}
                                    onChange={handleSearchChange}
                                    placeholder="Search by service ID"
                                    className="mt-16 w-full p-2  "
                                />
                            </div>
                            <div style={{ height: '36rem' }} className="  scrollabler overflow-x-hidden">
                                <div className=" overflow-hidden w-full p-2">
                                    <div id="result">
                                        {/* Display filtered services here */}
                                        {searchhh && filteredServices.length > 0 ? (
                                            filteredServices
                                                .filter((items) => {
                                                    const disabledArray = String(userData.disabled || "").split(","); // Ensure it is a string
                                                    return !disabledArray.includes(String(items.service)); // Check if service is not in the array
                                                })
                                                .map((service) => (
                                                    <div
                                                        key={service.service}
                                                        style={{ color: 'var(--tgui--text_color)', borderBottom: '1px solid var(--tgui--link_color)', background: 'var(--tgui--bg_color)' }}
                                                        onClick={() => clickedSearch(service)}
                                                        className="p-2 mb-2 overflow-hidden bg-white text-black rounded-md"
                                                    >
                                                        <h4 className="font-bold">{service.name}</h4>
                                                        <p>
                                                            <strong>Category</strong> {service.category}
                                                        </p>
                                                        <p>
                                                            <strong>Rate</strong> {Number((service.rate / userData.rate * 1000).toFixed(2))} Per 1000
                                                        </p>
                                                        <p>
                                                            <strong>Min</strong> {service.min} <strong>Max</strong>{" "}
                                                            {service.max}
                                                        </p>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>No matching results found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => readySearch(false)}
                            className='grid place-content-center '
                        >
                            <div className="flex pt-4">
                                <FontAwesomeIcon icon={faRotateBackward} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Back</Text>
                            </div>
                        </div>
                    </div>
                )}


                {
                    useNotification.notificationModal && (
                        <div style={{
                            zIndex: 900, background: 'var(--tgui--section_bg_color)'
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
                {
                    promoModal && (
                        <div style={{ zIndex: 900 }} className="absolute top-0 bottom-0 w-screen bg-red-100">
                            <div onClick={() => setpromoModal(false)} className="absolute top-2 right-2 p-3 bg-red-300">X</div>
                            <input type="text" placeholder="message" onChange={(e) => setPromoCode(e.target.value)} value={promoCode} />
                            <button onClick={checkPromo}>send</button>
                        </div>
                    )
                }
                <div className='z-90  w-full absolute mt-4 grid place-content-end  ' style={{ top: '9.3rem', right: '1rem' }}>
                    <FontAwesomeIcon onClick={() => readySearch(true)} icon={faSearch} style={{ 'margin': 'auto 1rem', color: 'var(--tgui--section_header_text_color)' }} size="1x" />
                </div>
                {/* <Section header={(<div style={{ fontWeight: '500', paddingLeft: '1rem', color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }}>1.order</div>)} style={{ position: 'relative', border: '1px solid var(--tgui--section_bg_color)', marginTop: '1rem' }}>
 */}<br />
                <Section style={{ position: 'relative', border: '1px solid var(--tgui--section_bg_color)', marginTop: '0.2rem' }}>

                    <div className="gap-x-9 relative px-6 gap-y-3 place-items-center   mx-auto h-auto grid grid-cols-3 px-4 ">
                        {mediaload && (<div style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', background: 'rgba(125, 125, 125, 0.2)' }} className='grid place-content-center absolute  top-0 bottom-0 left-0 right-0'>
                            <Spinner size="l" />
                        </div>)}
                        <div id="a" className='common-styles' onClick={() => getCategory('Youtube', '#ff0000', iconMap.youtube, 'Youtube')} style={{ 'borderRadius': '10px', fontSize: '0.5rem', border: `2px solid ${bcfor == 'Youtube' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faYoutube} color="#ff0000" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>YouTube</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Tiktok', 'var(--tgui--text_color)', iconMap.tiktok, 'Tiktok')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Tiktok' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faTiktok} style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Tiktok</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Telegram', '#0088cc', iconMap.telegram, 'Telegram')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Telegram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faTelegram} color="#0088cc" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Telegram</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Facebook', '#1877f2', iconMap.facebook, 'Facebook')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Facebook' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faFacebook} color="#1877f2" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Facebook</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Instagram', '#c32aa3', iconMap.instagram, 'Instagram')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Instagram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faInstagram} color="#c32aa3" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Instagram</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Twitter', 'var(--tgui--text_color)', iconMap.twitter, 'Twitter')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitter' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faXTwitter} style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitter/X</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Discord', '#0a66c2', iconMap.discord, 'Discord')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Discord' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faDiscord} color="#0a66c2" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Discord</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Whatsapp', '#25d366', iconMap.whatsapp, 'Whatsapp')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Whatsapp' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faWhatsapp} color="#25d366" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Whatsapp</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Spotify', '#1DB954', iconMap.spotify, 'Spotify')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Spotify' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faSpotify} color="#1DB954" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Spotify</Text>
                            </div>
                        </div>
                    </div>
                </Section>



                <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>1. Category</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div onClick={() => showModalA(true)} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                        <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                            <FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />
                            <div className='mx-4  font-bold text-nowrap overflow-hidden   my-auto' style={{ fontSize: '1rem' }}>
                                <div style={{ color: (cat && !ser) ? "var(--tgui--text_color)" : "var(--tgui--hint_color)" }}>{chosen?.category || `Select ${icon.n} Category`}</div>
                            </div>
                            <div className='my-4  ml-auto mx-4 justify-self-end'>
                                <FontAwesomeIcon className={(cat && !id && !chosen?.category) && "fa-lock"} icon={faAngleDown} color="var(--tgui--subtitle_text_color)" style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                        </div>
                    </div>
                </Section>


                {
                    modalA &&
                    //  <div style={{ 'zIndex': '90', background: 'var(--tgui--section_bg_color)' }} className=' modal-pop    h-screen  w-screen absolute top-0 grid place-content-center bottom-0 left-0 right-0 p-2'>
                    <div style={{ 'zIndex': '90', background: 'var(--tgui--section_bg_color)' }} className=' modal-pop    h-screen  w-screen absolute top-0 grid place-content-center bottom-0 left-0 right-0 p-2'>

                        <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '80%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)', 'border': '1px solid var(--tgui--bg_color)' }} className='scrollable mx-auto p-8 '>

                            {category.map((datas, index) => (
                                <div key={index} className="px-1 py-3" onClick={() => getService(datas.category, datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                    <div className=" text-wrap flex">
                                        <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                        <div className='ml-4' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>{datas.category}</div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div onClick={() => showModalA(false)} className='absolute  text-white  w-11/12 ml-2 grid place-content-center p-3'>
                            <div className='flex'>
                                <FontAwesomeIcon icon={faRotateBackward} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Back</Text>
                            </div>
                        </div>
                    </div>
                }


                <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }} onClick={() => showModalB(true)} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>2. Service</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div onClick={() => showModalB(true)} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                        <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                            <FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />
                            <div className='mx-4  font-bold text-nowrap overflow-hidden  my-auto' style={{ fontSize: '1rem' }}>
                                <div style={{ color: (!id && ser) ? "var(--tgui--text_color)" : "var(--tgui--hint_color)" }}>{!id ? `Select ${icon.n} Service` : id}</div>
                            </div>
                            <div className='my-4 ml-auto mx-4 justify-self-end'>
                                <FontAwesomeIcon className={(cat && !id && chosen?.category) && "fa-lock"} icon={faAngleDown} color="var(--tgui--subtitle_text_color)" style={{ 'margin': 'auto auto' }} size="2x" />
                            </div>
                        </div>





                    </div>
                </Section>

                {
                    modalB &&
                    // <div style={{ 'zIndex': '90', background: 'var(--tgui--section_bg_color)' }} className='  modal-pop h-screen bg-red-100 absolute top-0 grid place-content-start bottom-0 left-0 right-0 p-2'>
                    <div style={{ 'zIndex': '90', background: 'var(--tgui--section_bg_color)' }} className=' modal-pop    h-screen  w-screen absolute top-0 grid place-content-center bottom-0 left-0 right-0 p-2'>

                        <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '80%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)', 'border': '1px solid var(--tgui--bg_color)' }} className='scrollable mx-auto p-8 '>


                            {ser ? service
                                .filter((items) => {
                                    const disabledArray = String(userData.disabled || "").split(","); // Ensure it is a string
                                    return !disabledArray.includes(String(items.service)); // Check if service is not in the array
                                })
                                .map((datas, index) => (

                                    <div className="p-2 py-4" key={index} onClick={() => setChose(datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                        <div className="text-wrap flex">
                                            <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />

                                            <div className='ml-4 text-wrap' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>{datas.service} {datas.name}
                                                <div style={{ background: 'var(--tgui--secondary_bg_color)', color: 'var(--tgui--text_color)' }} className=' m-3 rounded-lg  p-1 inline'>{Number((datas.rate / userData.rate * 1000).toFixed(2))} Per 1000</div>
                                            </div>

                                        </div>
                                    </div>
                                )) : <Text>Choose Category</Text>}

                        </div>
                        <div onClick={() => showModalB(false)} className='absolute  text-white  w-11/12 ml-2 grid place-content-center p-3'>
                            <div className='flex'>
                                <FontAwesomeIcon icon={faRotateBackward} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Back</Text>
                            </div>
                        </div>
                    </div>
                }

                <Button
                    mode="filled"
                    size="l"
                    style={{ 'width': '96%', 'marginLeft': '2%', 'marginTop': '2%' }}
                    onClick={openModal}
                >
                    Order
                </Button>
                {
                    loader ? <MyLoader /> :
                        id && description && (
                            <div className='overflow-hidden w-11/12 mx-auto p-2' style={{ height: 'auto', borderRadius: '8px', border: '2px groove var(--tgui--subtitle_text_color)' }}>
                                <Text style={{ fontSize: '0.8rem' }}>
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </Text>
                            </div>
                        )
                }

                {
                    isModalOpen && (
                        <div

                            className="fixed inset-0 modal-pops  w-screen h-screen  bg-black bg-opacity-75 grid content-center  z-50"
                            onClick={closeModal}
                        >
                            <div
                                style={{ width: '90%', background: 'var(--tgui--bg_color)' }}
                                className=" modal-pop mx-auto lg:w-4/12  px-2 py-8 rounded-lg relative w-96"
                                onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
                            >


                                <div
                                    className=" text-gray-500 absolute m-2 right-0  top-0 px-4 py-3 rounded-md"
                                    onClick={closeModal}
                                >
                                    <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                                </div>
                                <div style={{ paddingLeft: '1rem' }}>
                                    {!cat && 'Choose Media' || !chosen?.name && `Choose ${icon.n} Category And Service` || (chosen.name && !id) && `Choose ${icon.n} Service` || cat && ser && (<>
                                        <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold ml-4 mb-4">Order Detail</h2>

                                        <Input header="Quantity" value={quantity} onInput={handleInput} placeholder="Enter the quantity" />
                                        <Input header="Link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter the link" />

                                        <div className='p-2 ml-4'>  {labelel}</div>
                                        <div className='p-2 ml-4'> Charge: <strong>{charge} ETB</strong></div>
                                        <div className='p-2 ml-4'> Service: {id}</div>
                                        <div className="flex mt-6  justify-between">
                                            <button
                                                disabled={disable === true}
                                                onClick={handleOrder}
                                                style={{ background: 'var(--tgui--button_color)' }}
                                                className=" w-10/12 mx-auto text-white  px-6 py-4 rounded-md"
                                            >
                                                {disable == true ? (
                                                    <>
                                                        <button className="buttonload">
                                                            <FontAwesomeIcon icon={faRefresh} className="spin" /> Loading
                                                        </button>


                                                    </>
                                                ) : "Order"}</button>

                                        </div>
                                    </>)}
                                </div>

                            </div>
                        </div>
                    )
                }



            </List >

        </>

    );
}

export default Smm;