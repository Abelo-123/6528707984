"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, Spinner, List, Text, Input } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
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
    const [bcfor, setBcfor] = useState('')
    const [mediaload, setMediaload] = useState(true);
    const [charge, setCharge] = useState(0.0);
    const [theRate, settherate] = useState(0.0);
    const [link, setLink] = useState(null);
    const [quantity, setQuantity] = useState(null);
    // Replace with your bot token
    const { setUserData, userData } = useUser();
    //const [checkname, setCheckname] = useState('')
    const [authmessage, setAuthMsg] = useState('')
    const [id, setId] = useState('')
    const [ls, setLs] = useState('')
    const [modalA, showModalA] = useState(false)
    const [modalB, showModalB] = useState(false)
    const [searchh, readySearch] = useState(false)

    const [search, setSearch] = useState('');
    const [servicess, setServicess] = useState([]); // All services
    const [filteredServices, setFilteredServices] = useState([]); // Filtered services
    const [description, setDescription] = useState("")

    const [promoModal, setpromoModal] = useState(false)

    const [promoCode, setPromoCode] = useState('')

    const [disable, setDisable] = useState(false)
    const [loader, showLoad] = useState(false)
    const [marq, setMarq] = useState('')

    useEffect(() => {
        const fetchMarq = async () => {

            const { data: setNotify, error: setError } = await supabase
                .from('adminmessage')
                .select('message')
                .eq('for', 'all')
                .single()

            if (setError) {
                console.error('Error fetching initial balance:', setError)
            } else {
                setMarq(setNotify.message)
            }
        }
        fetchMarq();
    }, [])

    useEffect(() => {
        const fetchDepo = async () => {
            const { data: seeDataa, error: seeErora } = await supabase
                .from('adminmessage')
                .select('seen')
                .eq('seen', true);

            if (seeErora) {
                console.error('Error fetching initial balance:', seeErora);
            } else {
                if (seeDataa.length >= 1) {
                    setNotification((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        notificationLight: true,
                        // Update the `deposit` field
                    }));
                    console.log("there admin")
                } else {
                    console.log("no admin message")
                }
            }
        }
        fetchDepo()
    }, [])
    useEffect(() => {
        const auth = async () => {
            // Fetch the initial balance from the database



            const { data, error } = await supabase
                .from('users')
                .select('balance')
                .eq('id', userData.userId)
                .single(); // Get a single row

            if (error) {
                console.error('Error fetching initial balance:', error);
            } else {
                setBalance(data.balance); // Set initial balance
            }

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
            //const forCondition = userData?.userId || "for";





            // } 31013959



            // Subscribe to real-time changes

            supabase
                .channel('adminmessage')
                .on("postgres_changes", { event: "INSERT", schema: "public", table: "adminmessage" }, (payload) => {
                    //console.log("New order inserted:", payload.new);
                    // Add the new order to the state

                    if (payload.new.seen === true) {
                        setNotification((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            notificationLight: true
                            // Update the `deposit` field
                        }));
                        console.log(payload.new)
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
                    setAuthMsg(`User data already exists in localStorage: ${userNameFromStorage}`);
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
                            const storedData = localStorage.getItem(`userdata_name_${user.id}`);

                            setLs(`new set ${storedData}`)
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


        const storedData = localStorage.getItem(`userdata_name_${userData.userId}`);

        setLs(storedData)


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
        settherate(ser[0].rate)
        return setService(ser)
    }

    function setChose(data) {
        setId(data.name)
        setSer(true)
        setChosen(data)
        showModalB(false)
    }

    const handleInput = (e) => {
        setQuantity(e.target.value)
        const inputValue = e.target.value;
        setCharge(inputValue * theRate); // Perform the calculation
    };

    const handleOrder = async () => {
        if (quantity % 10 !== 0) {
            alert("multiple 10")
        } else if (quantity > 10000) {
            alert("to big")
        } else if (link == null) {
            alert("no link")
        } else if (quantity == 0) {
            alert("no quantity")
        } else if (link == null && quantity == 0) {
            alert("enter forms")
        }

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

    // Handle input change and filter services by the service id
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        //console.log(servicess[0].response)

        // Filter services where service ID matches the search value
        const filtered = servicess[0].response.filter(item =>
            item.service.toString().includes(value)
        );

        // Sort the filtered results so that exact matches come first
        const sortedFiltered = filtered.sort((a, b) => {
            const aService = a.service.toString();
            const bService = b.service.toString();

            const aMatch = aService === value;
            const bMatch = bService === value;

            if (aMatch && !bMatch) {
                return -1; // "a" should come first if it's an exact match
            }
            if (!aMatch && bMatch) {
                return 1; // "b" should come first if it's an exact match
            }

            return aService.localeCompare(bService); // Otherwise, sort lexicographically
        });

        setFilteredServices(sortedFiltered)
    };

    const clickedSearch = (service) => {
        setChose(service)
        readySearch(false)
        settherate(service.rate)
        setIcon(() => {
            return ({ i: iconMap.search, c: 'black', n: search })
        })
    }

    const closeModal = () => {
        setIsModalOpen(false);

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
                        .eq('id', 100)
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


    return (

        <List>
            {authmessage}<br />
            {<button onClick={() => {
                localStorage.clear();

            }}>
                Clean
            </button>}<br />
            local data:{ls}<br />
            {/* <button className="p-2 bg-red-100" onClick={() => setpromoModal(true)}>

                promo</button> */}
            {
                searchh && (<>
                    <div style={{ zIndex: 900 }} className="absolute top-0 bottom-0 w-screen bg-red-100">
                        <div onClick={() => readySearch(false)} className="absolute top-2 right-2  ">
                            <FontAwesomeIcon icon={faClose} color="white" style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>

                        <div className="p-3 bg-red-200 gap-5 pt-24 grid content-start w-full h-auto ">
                            <div className="bg-red-500 p-2 ">
                                <input
                                    id="search"
                                    type="text"
                                    value={search}
                                    onChange={handleSearchChange}
                                    placeholder="Search by service ID"
                                    className="w-full p-2"
                                />
                            </div>
                            <div className="bg-red-600 w-full p-2">
                                <div id="result">
                                    {/* Display filtered services here */}
                                    {search && filteredServices.length > 0 ? (
                                        filteredServices.map((service) => (
                                            <div key={service.service} onClick={() => clickedSearch(service)} className="p-2 mb-2 bg-white text-black rounded-md">
                                                <h4 className="font-bold">{service.name}</h4>
                                                <p><strong>Category</strong> {service.category}</p>
                                                <p><strong>Rate</strong> {service.rate}</p>
                                                <p><strong>Min</strong> {service.min} <strong> Max</strong> {service.max}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No matching results found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }

            {
                useNotification.notificationModal && (
                    <div style={{ zIndex: 900 }} className="absolute top-0 bottom-0 w-screen bg-red-100">
                        <div onClick={() => {
                            setNotification((prevNotification) => ({
                                ...prevNotification, // Spread the previous state
                                notificationModal: false,
                                notificationData: [],
                                notificationLoader: true,
                                // Update the `deposit` field
                            }));
                        }} className="absolute top-2 right-2 p-3 bg-red-300">X</div>
                        {useNotification.notificationLoader && <MyLoader style={{ marginTop: '2rem' }} />}
                        {!useNotification.notifcationLoader && useNotification.notificationData && useNotification.notificationData.map((items, index) => (
                            <div key={index} className="p-3 bg-red-200 gap-5 grid content-start w-screen " >
                                <li className="flex w-11/12 p-3 mx-auto" style={{ borderTop: '2px solid black' }}>
                                    <div className="block w-full px-2">
                                        <div className="text-right ml-auto"> {items.from}</div>
                                        <div className="text ml-2"> {items.message}</div>
                                    </div>
                                </li>
                            </div>
                        ))}


                    </div>
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

            <marquee style={{ margin: '1px' }}>{marq}</marquee>

            <Section header="Promo Code" style={{ position: 'relative', border: '1px solid var(--tgui--section_bg_color)' }}>
                <div className='absolute' style={{ top: '1rem', right: '1rem' }}>
                    <FontAwesomeIcon onClick={() => readySearch(true)} icon={faSearch} color="blue" style={{ 'margin': 'auto auto' }} size="1x" />
                </div>
                <div className="gap-x-9 relative px-6 gap-y-3 place-items-center   mx-auto h-auto grid grid-cols-3 px-4 ">
                    {mediaload && (<div style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', background: 'rgba(125, 125, 125, 0.2)' }} className='grid place-content-center absolute  top-0 bottom-0 left-0 right-0'>
                        <Spinner size="l" />
                    </div>)}
                    <div id="a" className='common-styles' onClick={() => getCategory('Youtube', '#ff0000', iconMap.youtube, 'Youtube')} style={{ 'borderRadius': '10px', fontSize: '0.5rem', border: `2px solid ${bcfor == 'Youtube' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faYoutube} color="#ff0000" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Youube</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Tiktok', '#ffffff', iconMap.tiktok, 'tiktok')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Tiktok' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTiktok} style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Tiktok</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Telegram', '#0088cc', iconMap.telegram, 'telegram')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Telegram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTelegram} color="#0088cc" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Telegram</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Facebook', '#1877f2', iconMap.facebook, 'facebook')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Facebook' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faFacebook} color="#1877f2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Facebook</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Instagram', '#c32aa3', iconMap.instagram, 'instagram')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Instagram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faInstagram} color="#c32aa3" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Instagram</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Twitter', '#ffffff', iconMap.twitter, 'twitter')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitter' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faXTwitter} style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitter/X</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('LinkedIn', '#0a66c2', iconMap.linkedin, 'linkedin')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'LinkedIn' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faLinkedin} color="#0a66c2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>LinkedIn</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Tiktok', '#ffffff', iconMap.whatsapp, 'whatsapp')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Whatsapp' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faWhatsapp} color="#25d366" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Whatsapp</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Twitch', '#ffffff', iconMap.twitch, 'twitch')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitch' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitch</Text>
                        </div>
                    </div>
                </div>
            </Section>



            <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)' }} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>2. category</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                <div onClick={() => showModalA(true)} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                    <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                        <FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />
                        <div className='mx-4  font-bold text-nowrap overflow-hidden   my-auto' style={{ fontSize: '1rem' }}>
                            <div style={{ color: (cat && !ser) ? "var(--tgui--section_header_text_color)" : "black" }}>{chosen?.category || `Select ${icon.n} category`}</div>
                        </div>
                        <div className='my-4  ml-auto mx-4 justify-self-end'>
                            <FontAwesomeIcon className={(cat && !id && !chosen?.category) && "fa-lock"} icon={faAngleDown} color="var(--tgui--subtitle_text_color)" style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>
                    </div>
                </div>
            </Section>


            {
                modalA &&
                <div style={{ 'zIndex': '90' }} className=' modal-pop  bg-opacity-75 bg-black  h-screen  absolute top-0 grid place-content-center bottom-0 left-0 right-0 p-2'>
                    <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '80%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)' }} className='scrollable my-auto mx-auto p-8 '>
                        <div onClick={() => showModalA(false)} className='absolute top-0 right-0 m-6 text-white p-3'>
                            <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>
                        {category.map((datas, index) => (
                            <div key={index} className="px-1 py-3" onClick={() => getService(datas.category, datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <div className=" text-wrap flex">
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                    <div className='ml-4' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>{datas.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }


            <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)' }} onClick={() => showModalB(true)} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>3. service</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                <div onClick={() => showModalB(true)} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                    <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                        <FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />
                        <div className='mx-4  font-bold text-nowrap overflow-hidden  my-auto' style={{ fontSize: '1rem' }}>
                            <div style={{ color: (!id && ser) ? "var(--tgui--section_header_text_color)" : "black" }}>{!id ? `Select ${icon.n} service` : id}</div>
                        </div>
                        <div className='my-4 ml-auto mx-4 justify-self-end'>
                            <FontAwesomeIcon className={(cat && !id && chosen?.category) && "fa-lock"} icon={faAngleDown} color="var(--tgui--subtitle_text_color)" style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>
                    </div>





                </div>
            </Section>

            {
                modalB &&
                <div style={{ 'zIndex': '90' }} className=' bg-opacity-75 bg-black modal-pop h-screen  absolute top-0 grid place-content-center bottom-0 left-0 right-0 p-2'>
                    <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '80%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)' }} className='scrollable my-auto mx-auto p-8 '>
                        <div onClick={() => showModalB(false)} className='absolute top-0 text-white right-0 m-6 b p-3'>
                            <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="2x" />
                        </div>

                        {ser ? service.map((datas, index) => (

                            <div className="p-2 py-4" key={index} onClick={() => setChose(datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <div className="text-wrap flex">
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                    <div className='ml-4 text-wrap' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>{datas.name}
                                        <div className='bg-red-100 m-2 rounded-lg  p-2 inline'>ola</div>
                                    </div>

                                </div>
                            </div>
                        )) : <Text>Choose Category</Text>}
                    </div>
                </div>
            }

            <Button
                mode="filled"
                size="l"
                style={{ 'width': '96%', 'marginLeft': '2%', 'marginTop': '2%' }}
                onClick={openModal}
            >
                Action
            </Button>
            {
                loader ? <MyLoader /> :
                    id && description && (
                        <div className=' w-11/12 mx-auto p-2' style={{ height: 'auto', borderRadius: '8px', border: '2px groove var(--tgui--subtitle_text_color)' }}>
                            <Text style={{ fontSize: '0.8rem' }}>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </Text>
                        </div>
                    )
            }

            {
                isModalOpen && (
                    <div

                        className="fixed inset-0 modal-pops absolute  bg-black bg-opacity-75 grid content-center  z-50"
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
                                <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto' }} size="1x" />
                            </div>
                            <div style={{ paddingLeft: '1rem' }}>
                                {!cat && 'choose media' || !chosen?.name && `choose ${icon.n} category and service` || (chosen.name && !id) && `choose ${icon.n} service` || cat && ser && (<>
                                    <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold ml-4 mb-4">Make Deposit</h2>
                                    <p className="mb-4 ml-4">Enter the amount you want to deposit:{userData.userId}</p>
                                    <Input header="Input" value={quantity} onInput={handleInput} placeholder="Write and clean me" />
                                    <Input header="Input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Write and clean me" />
                                    {charge}
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

    );
}

export default Smm;