"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, Spinner, List, Text, Input } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faClose, faDiceFour, faRotateBackward, faSearch } from '@fortawesome/free-solid-svg-icons';
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
    other: faDiceFour,
    discord: faDiscord
};

const Smm = () => {
    const { setNotification } = useNot();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<AxiosResponse<any, any>[]>([])
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
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [search, setSearch] = useState('');
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [searchhh, setSearchh] = useState('');
    const [servicess, setServicess] = useState([]); // All services
    const [filteredServices, setFilteredServices] = useState<any[]>([]); // Filtered services
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [description, setDescription] = useState("")
    const [at, setAt] = useState("")
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [promoModal, setpromoModal] = useState(false)

    const [promoCode, setPromoCode] = useState('')

    const [disable, setDisable] = useState(false)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [loader, showLoad] = useState(false)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [loadingBB, setLoadingbb] = useState(true);

    const [type, serviceType] = useState('')
    const [minn, setMin] = useState(0)
    const [maxx, setMax] = useState(0)
    // const [marq, setMarq] = useState('')
    const [comment, setComment] = useState(null)
    const [answernumber, setanswerNumber] = useState(null);

    const [usernameowner, setusernameOwner] = useState('')

    const [serviceId, setServiceId] = useState(null)
    const [refill, setRefill] = useState(false)
    const handleTextareaChange = (e) => {
        const value = e.target.value;
        // Optional: normalize line endings to "\n" if you're concerned about cross-platform consistency
        const withEscapedLineBreaks = value.replace(/\n/g, '\\n');
        setComment(withEscapedLineBreaks);
        setCharge(Number(Number(value.split('\n').length * theRate * userData.allrate * userData.rate / 200 * 195 / 1000).toFixed(8)))
        setQuantity(value.split('\n').length); // Count the number of lines
    };

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
                        .eq('for', user.id)
                        .eq('father', 6528707984)
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

                            if ((Number(payload.new.for) === user.id && payload.new.father === 6528707984) && payload.new.seen === true) {
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
            }
        }
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
                                    { name: user.first_name, username: user?.username, profile: user.photo_url, id: user.id, father: 6528707984 }
                                ]);

                            if (!error) {
                                await axios.post('https://paxyo-bot-ywuk.onrender.com/api/sendToJohn', {
                                    "type": "newuser",
                                    "uid": user?.first_name,
                                    "uuid": user?.id
                                });
                            }
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
            const { data, error } = await supabase.from('desc').select('description, average_time').eq('service', ser);
            // setDescription([response.data.success[0]])
            if (error) {
                console.error(error.message)
            } else {
                showLoad(false)
                setDescription(data[0].description)
                setAt(data[0].average_time)
            }

        }
        fetchDescc()
    }, [id]); // Effect depends on both chose and chose

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {


        async function fetchService() {
            try {
                const response = await axios.get('/api/smm/fetchService');

                setServices([response]);
                console.log(response)
                if (response) {
                    setMediaload(false)
                    function getCategory() {


                        //setBcfor('Other')
                        setBc('var(--tgui--section_header_text_color)')
                        setCat(true)

                        setIcon(() => {
                            return ({ i: iconMap.other, c: '#24A1DE', n: '' })
                        })


                        setCategory(
                            response.data.response
                                .filter((datas) =>
                                    name.split(/[ ,]+/).some((word) =>
                                        datas.category.toLowerCase().includes(word.toLowerCase()) // Handle case-insensitive search
                                    )
                                )
                                .reduce((unique, datas) => {
                                    if (!unique.some((item) => item.category === datas.category)) {
                                        unique.push(datas); // Add unique items to the array

                                    }
                                    return unique;
                                }, []) // Initialize with an empty array// Initialize with an empty array to accumulate unique values
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
        setAt(null)
        setBcfor(name)
        setBc('var(--tgui--section_header_text_color)')
        setCat(true)

        setIcon(() => {
            return ({ i: faicon, c: color, n: names })
        })

        setCategory(
            services[0]?.data?.response
                .filter((datas) =>
                    name.split(", ").some((word) => datas.category.includes(word)) // Filter by multiple words
                )
                .reduce((unique, datas) => {
                    if (!unique.some((item) => item.category === datas.category)) {
                        unique.push(datas); // Add unique items to the array

                    }
                    return unique;
                }, []) // Initialize with an empty array
        );

    }

    function getRecommendedService() {
        setSer(true); // Set to true to enable service modal
        setId(null);
        setCat(true);
        setChosen(null);
        setDescription(null);
        setAt(null);
        setBcfor('recommended');
        setBc('var(--tgui--section_header_text_color)');
        // Disable category modal

        setIcon(() => {
            return { i: iconMap.other, c: '#24A1DE', n: 'Top' };
        });

        const fetchRecommendedServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('adminmessage')
                    .select('message')
                    .eq('father', 6528707984)
                    .eq('from', 'Admin-re');

                if (error) {
                    console.error('Error fetching recommended services:', error);
                    return;
                }

                if (data.length > 0) {
                    const serviceIds = data[0].message.split(',').map((id) => id.trim());
                    const recommendedServices = services[0]?.data?.response.filter((service) =>
                        serviceIds.includes(String(service.service))
                    );

                    setService(recommendedServices); // Populate modalB with recommended services
                    //showModalB(true); // Open the service modal
                }
            } catch (err) {
                console.error('Error:', err.message);
            }
        };

        fetchRecommendedServices();

        // Subscribe to real-time changes in the adminmessage table
        supabase
            .channel('adminmessage-realtime')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'adminmessage', filter: `father=eq.6528707984,from=eq.Admin-re` }, (payload) => {
                const serviceIds = payload.new.message.split(',').map((id) => id.trim());
                const updatedServices = services[0]?.data?.response.filter((service) =>
                    serviceIds.includes(String(service.service))
                );
                setService(updatedServices); // Update services in real-time
            })
            .subscribe();
    }

    function getService(name, data) {
        setId(null)
        setChosen(data)
        setRefill(data.refill)
        console.log(data)
        setSer(true)
        setDescription(null)
        setAt(null)
        showModalA(false)

        const ser = services[0].data.response.filter((datas) => datas.category.includes(name))


        return setService(ser)
    }

    function setChose(data) {
        setId(data.name)
        setSer(true)

        setChosen(data)
        setRefill(data.refill)
        showModalB(false)
        settherate(data.rate)
        setMin(data.min)
        console.log(data)
        setMax(data.max)
        setLabel(`Min: ${data.min} Max: ${data.max}`)

        // Fetch request to send '13' as the service parameter

    }


    const handleInput = (e) => {
        setQuantity(e.target.value)
        const inputValue = e.target.value;
        setCharge(Number(Number(inputValue * theRate * userData.allrate * userData.rate / 200 * 195 / 1000).toFixed(8)))
        //  setCharge(Number((inputValue * theRate * userData.allrate * userData.rate).toFixed(2)))
        // Perform the calculation
    };

    const handleOrder = async () => {
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

                if (quantity % 10 !== 0) {
                    setDisable(false)
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




                } else if (type === 'Custome Comment' && comment == null) {
                    setDisable(false)
                    Swal.fire({
                        title: 'Missing Information',
                        text: 'No Comment Provided. Please complete all required fields',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'swal2-popup',    // Apply the custom class to the popup
                            title: 'swal2-title',    // Apply the custom class to the title
                            confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                            cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                        }
                    });



                } else if ((serviceId == 5836 || serviceId == 5648) && usernameowner == '') {
                    setDisable(false)
                    Swal.fire({
                        title: 'Missing Information',
                        text: 'No username of comment owner Provided. Please complete all required fields',
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
                else if (type === 'Poll' && answernumber == null) {
                    setDisable(false)
                    Swal.fire({
                        title: 'Missing Information',
                        text: 'No answer number Provided. Please complete all required fields',
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
                else if (link == null || link.trim() === '') {
                    setDisable(false)
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
                    setDisable(false)
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
                    setDisable(false)
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
                } else if (Number(minn) > Number(quantity) || Number(maxx) < Number(quantity)) {
                    setDisable(false)
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
                    setDisable(false)
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

                    const { data } = await supabase.from('users')
                        .select('a_balance')
                        .eq('id', 6528707984)
                        .single()

                    if (data.a_balance > charge) {

                        const response = await axios.post('/api/smm/addOrder', {
                            usernames: user.username,
                            service: chosen.service,
                            link: link,
                            quantity: quantity,
                            charge: charge,
                            refill: refill,
                            panel: 'sm',
                            name: id,
                            category: chosen.category,
                            id: user.id,
                            answer_number: answernumber || null,
                            comments: comment ? comment.replace(/\\\\n/g, '\n') : null,
                            username: usernameowner || null,
                            type: type,
                            rt: description.match(/\d+(?=\s*Days)/)?.[0] || null,
                        });
                        if (response.data.success) {
                            // setModalE(false)

                            // Notify the Smmhistory component about the new order
                            const newOrder = {
                                oid: response.data.orderOid, // Assuming the API returns the new order ID
                                status: "Pending",
                                start_from: 0,
                                remains: quantity,
                                link: link,
                                service: chosen.service,
                                charge: charge,
                                name: id,
                                refill: response.data.refill,
                                rtime: Date.now().toString(),
                                rt: description.match(/\d+(?=\s*Days)/)?.[0] || null,
                                date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
                                uid: user.id,
                            };

                            const event = new CustomEvent("newOrder", { detail: newOrder });
                            window.dispatchEvent(event);

                            // setModalE(false)
                            const { data: getbala, error: geterror } = await supabase.from('users')
                                .select('a_balance')
                                .eq('id', 6528707984)
                                .single()


                            if (!geterror) {
                                const news = parseFloat(getbala.a_balance.toString()) - parseFloat(charge.toString())
                                const { error } = await supabase.from('users')
                                    .update({ 'a_balance': news })
                                    .eq('id', 6528707984)
                                if (!error) {
                                    setIsModalOpen(false);
                                    setLink(null)
                                    setQuantity(null)
                                    setDisable(false)
                                    Swal.fire({
                                        title: 'Success!',
                                        text: `The operation was successful.`,
                                        icon: 'success',
                                        confirmButtonText: 'OK',
                                        customClass: {
                                            popup: 'swal2-popup',    // Apply the custom class to the popup
                                            title: 'swal2-title',    // Apply the custom class to the title
                                            confirmButton: 'swal2-confirm', // Apply the custom class to the confirm button
                                            cancelButton: 'swal2-cancel' // Apply the custom class to the cancel button
                                        }
                                    });
                                    setUserData((prevNotification) => ({
                                        ...prevNotification, // Spread the previous state
                                        balance: prevNotification.balance - charge, // Decrease balance by 40
                                    }));

                                }
                            }
                        }
                    } else {
                        setDisable(false)

                        Swal.fire({
                            title: 'Insufficient Balance',
                            text: 'Not enough balance in admin  to complete this order. Please recharge and try again.',
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


                }
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
        setLoadingbb(true);
    };

    // Handle input change and filter services by the service id
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchhh) {
                const filtered = servicess[0].response.filter((item) =>
                    item.service.toString().includes(searchhh) ||
                    item.name.toLowerCase().includes(searchhh.toLowerCase()) // NEW: match by name
                );

                const sortedFiltered = filtered.sort((a, b) => {
                    const aService = a.service.toString();
                    const bService = b.service.toString();
                    const aName = a.name.toLowerCase();
                    const bName = b.name.toLowerCase();
                    const searchLower = searchhh.toLowerCase();

                    const aMatch = aService === searchhh || aName === searchLower;
                    const bMatch = bService === searchhh || bName === searchLower;

                    if (aMatch && !bMatch) return -1;
                    if (!aMatch && bMatch) return 1;

                    return aService.localeCompare(bService);
                });

                setFilteredServices(sortedFiltered);
                setLoadingbb(false);
            } else {
                setFilteredServices([]);
                setLoadingbb(false);
            }
        }, 2000); // 2 second debounce

        return () => clearTimeout(timeout);
    }, [searchhh, servicess]);


    const clickedSearch = (service) => {
        setChose(service);
        console.log(service)
        readySearch(false);
        setServiceId(service.service)
        serviceType(service.type);
        settherate(service.rate);
        setIcon(() => {
            return { i: iconMap.search, c: "white", n: search };
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDisable(false)
        setQuantity(null)
        setCharge(0)
        setLink(null)
    };

    const { useNotification } = useNot();

    const checkPromo = async () => {
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
                            .ilike('users', `%${user.id}%`); // Check if '100' exists surrounded by commas

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
                                .eq('id', user.id)
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
                                const updatedArray = `${currentArray}, ${user.id}`;

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
                                        .eq('id', user.id); // Add WHERE clause for id = 100
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
        }
    }


    useEffect(() => {
        const fetchRate = async () => {


            const { data: rate, error: fetchError2 } = await supabase
                .from('panel')
                .select('value')
                .eq('owner', 6528707984)
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
                const { data: rates, error: fetchError3 } = await supabase
                    .from('panel')
                    .select('allrate')
                    .eq('owner', 6528707984)
                    .eq('key', 'rate')
                    .single();  // Increment balance by 200

                if (fetchError3) {
                    console.log(fetchError3.message)
                } else {
                    setUserData((prevNotification) => ({
                        ...prevNotification, // Spread the previous state
                        allrate: Number(rates.allrate),
                        // Update the `deposit` field
                    }))
                }
            }
        }
        const fetchDisable = async () => {


            const { data: rate, error: fetchError2 } = await supabase
                .from('panel')
                .select('bigvalue')
                .eq('owner', 6528707984)
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
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "panel", filter: `owner=eq.6528707984` }, (payload) => {
                //console.log("New order inserted:", payload.new);
                // Add the new order to the state
                if (payload.new.key === 'rate') {
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

                if (payload.new.owner == 6528707984) {
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

    useEffect(() => {
        supabase
            .channel("panel_56")
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'panel', filter: `owner=eq.6528707984` }, (payload) => {

                if (payload.new.key === 'disabled') {
                    setUserData((prevNotificationl) => ({
                        ...prevNotificationl, // Spread the previous state
                        disabled: payload.new.bigvalue,
                        // Update the `deposit` field
                    }))
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
                    {comment}
                </button>}<br /> */}
                {/* <button className="p-2 bg-red-100" onClick={() => setpromoModal(true)}>
                
                promo</button> */}
                {searchh && (
                    <div
                        style={{ background: 'var(--tgui--section_bg_color)', zIndex: 90000 }}
                        className="modal-popp  fixed overflow-y-hidden min-w-screen top-0 bottom-0  "
                    >


                        <div style={{ height: '90%' }} className="p-3  gap-5 grid content-start w-screen h-auto">
                            <div className=" p-2">
                                <input
                                    id="search"
                                    style={{ background: ' var(--tgui--section_bg_color)', borderBottom: '1px solid var(--tgui--accent_text_color)' }}
                                    type="text"
                                    value={searchhh}
                                    onChange={handleSearchChange}
                                    placeholder="Search by service ID"
                                    className="mt-4 w-full p-2  "
                                />
                            </div>
                            <div className="  scrollabler overflow-x-hidden">
                                <div className=" overflow-hidden w-full p-2">
                                    <div id="result">
                                        {/* Display filtered services here */}
                                        {loadingBB ? (
                                            <img
                                                src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif"
                                                alt="Loading..."
                                                className="mx-auto w-16 h-16"
                                            />
                                        ) : (
                                            searchhh && filteredServices.length > 0 ? (
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
                                                            <h4 className="font-bold">{service.service} - {service.name}</h4>
                                                            <p>
                                                                <strong>Category</strong> {service.category}
                                                            </p>
                                                            <p>
                                                                <strong>Price</strong> {Number((service.rate / 200 * 195 * userData.allrate * userData.rate).toFixed(8))} Br Per 1000
                                                            </p>
                                                            <p>
                                                                <strong>Min</strong> {service.min} <strong>Max</strong>{" "}
                                                                {service.max}
                                                            </p>
                                                        </div>
                                                    ))
                                            ) : (
                                                <p>No  matching results found.</p>
                                            ))}
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
                            zIndex: 90000, background: 'var(--tgui--section_bg_color)'
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
                {
                    promoModal && (
                        <div style={{ zIndex: 900 }} className="absolute top-0 bottom-0 w-screen bg-red-100">
                            <div onClick={() => setpromoModal(false)} className="absolute top-2 right-2 p-3 bg-red-300">X</div>
                            <input type="text" placeholder="message" onChange={(e) => setPromoCode(e.target.value)} value={promoCode} />
                            <button onClick={checkPromo}>send</button>
                        </div>
                    )
                }
                <div className='z-90  w-full absolute mt-4 grid place-content-end absolute  ' style={{ top: '5.3rem' }}>
                    <FontAwesomeIcon onClick={() => readySearch(true)} icon={faSearch} style={{ 'margin': 'auto 2rem', fontSize: '1.5rem', zIndex: 9000, color: 'var(--tgui--section_header_text_color)' }} />
                </div>
                {/* <Section header={(<div style={{ fontWeight: '500', paddingLeft:  '1rem', color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }}>1.order</div>)} style={{ position: 'relative', border: '1px solid var(--tgui--section_bg_color)', marginTop: '1rem' }}>
 */}<br />
                <Section style={{ position: 'relative', border: '1px solid var(--tgui--section_bg_color)', marginTop: '0.4rem' }}>

                    <div className="gap-x-9 relative px-6 gap-y-3 place-items-center   mx-auto h-auto grid grid-cols-3 px-4 ">
                        {mediaload && (<div style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', background: 'rgba(125, 125, 125, 0.2)' }} className='grid place-content-center absolute  top-0 bottom-0 left-0 right-0'>
                            <Spinner size="l" />
                        </div>)}
                        <div
                            className='common-styles'
                            onClick={getRecommendedService}
                            style={{
                                borderRadius: '10px',
                                fontSize: '0.6rem',
                                border: `2px solid ${bcfor == 'recommended' ? bc : 'rgba(112, 117, 121, 0.4)'}`,
                            }}
                        >

                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Telegram_Premium.png" alt="Telegram Premium" style={{ height: '1.3rem', margin: 'auto auto', width: 'auto' }} />

                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Top</Text>
                            </div>


                        </div>

                        <div id="a" className='common-styles' onClick={() => getCategory('Youtube, YouTube', '#ff0000', iconMap.youtube, 'Youtube')} style={{ 'borderRadius': '10px', fontSize: '0.5rem', border: `2px solid ${bcfor == 'Youtube, YouTube' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
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
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Instagramm</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Twitter', 'var(--tgui--text_color)', iconMap.twitter, 'Twitter')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitter' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faXTwitter} style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitter/X</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Whatsapp', '#25d366', iconMap.whatsapp, 'Whatsapp')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Whatsapp' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faWhatsapp} color="#25d366" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Whatsapp</Text>
                            </div>
                        </div>
                        <div className='common-styles' onClick={() => getCategory('Linkedin, Discord, Threads, Spotify, Pinterest, Clubhouse, Twitch, Kick, Bigo, Trovo, Kwai, Shopee', '#24A1DE', iconMap.other, 'Other')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Linkedin, Discord, Threads, Spotify, Pinterest, Clubhouse, Twitch, Kick, Bigo, Trovo, Kwai, Shopee' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                            <FontAwesomeIcon icon={faDiceFour} color="#24A1DE" style={{ 'margin': 'auto auto' }} size="2x" />
                            <div className='my-auto mx-2'>
                                <Text weight="2" style={{ fontSize: '0.9rem' }}>Other</Text>
                            </div>
                        </div>

                    </div>
                </Section>




                {bcfor !== "recommended" && (

                    <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>1. Category</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                        <div onClick={() => {
                            showModalA(true)
                            window.scrollTo(0, 0);
                        }} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

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
                    </Section>)}


                {
                    modalA &&
                    <div style={{ 'zIndex': '90000', background: 'var(--tgui--section_bg_color)' }} className=' modal-pop inset-0  h-screen  w-screen absolute  fixed top-0 grid place-content-start bottom-0 left-0 right-0 p-2'>

                        <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '90%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)', 'border': '1px solid var(--tgui--bg_color)' }} className='scrollable mx-auto p-8 '>
                            {bcfor === 'recommended' ? (
                                <Text style={{ fontSize: '1rem', color: 'var(--tgui--hint_color)', textAlign: 'center', marginTop: '2rem' }}>
                                    Check on Service
                                </Text>
                            ) : (
                                category.map((datas, index) => (
                                    <div key={index} className="px-1 py-3" onClick={() => getService(datas.category, datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }}>
                                        <div className="text-wrap flex">
                                            <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                            <div className='ml-4' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>{datas.category}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div onClick={() => showModalA(false)} className='absolute  text-white mt-4 w-11/12 ml-2 grid place-content-center p-3'>
                            <div className='flex'>
                                <FontAwesomeIcon icon={faRotateBackward} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Back</Text>
                            </div>
                        </div>
                    </div>
                }


                <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)', fontSize: '0.9rem' }} onClick={() => showModalB(true)} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>2. Service</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                    <div onClick={() => {
                        showModalB(true)
                        window.scrollTo(0, 0);
                    }} className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                        <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                            {icon.n === "Top" && (
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Telegram_Premium.png" alt="Telegram Premium" style={{ height: '1.3rem', margin: 'auto 0.4rem', width: 'auto' }} />
                            ) || (
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />
                                )}
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
                    <div style={{ 'zIndex': '90000', background: 'var(--tgui--section_bg_color)' }} className='modal-pop h-screen w-screen absolute top-0 grid place-content-start bottom-0 left-0 right-0 p-2'>
                        <div style={{ 'borderRadius': '10px', 'overflow': 'auto', 'height': '90%', 'width': '100%', 'background': 'var(--tgui--section_bg_color)', 'color': ' var(--tgui--text_color)', 'border': '1px solid var(--tgui--bg_color)' }} className='scrollable mx-auto p-8 '>
                            {ser ? service
                                .filter((items) => {
                                    const disabledArray = String(userData.disabled || "").split(","); // Ensure it is a string
                                    return !disabledArray.includes(String(items.service)); // Check if service is not in the array
                                })
                                .map((datas, index) => (
                                    <div className="p-2 py-4" key={index} onClick={() => {
                                        setChose(datas);
                                        setServiceId(datas.service);
                                        serviceType(datas.type);
                                    }} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }}>
                                        <div className="text-wrap flex">
                                            {icon.n === "Top" && (
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Telegram_Premium.png" alt="Telegram Premium" style={{ height: '1.3rem', margin: 'auto 0.4rem', width: 'auto' }} />
                                            ) || (
                                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                                )}

                                            <div className='ml-4 text-wrap' style={{ fontSize: '0.8rem', color: 'var(--tgui--text_color)' }}>
                                                {datas.service} {datas.name}
                                                <div style={{ background: 'var(--tgui--secondary_bg_color)', color: 'var(--tgui--text_color)' }} className='m-3 rounded-lg p-1 inline'>
                                                    {Number((Number(datas.rate) / 200 * 195 * Number(userData.allrate) * Number(userData.rate)).toFixed(8))} Br Per 1000
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : <Text>Choose Category</Text>}
                        </div>
                        <div onClick={() => showModalB(false)} className='absolute mt-4 text-white w-11/12 ml-2 grid place-content-center p-3'>
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
                {/* <p>{description ? description.match(/\d+(?=\s*Days)/)?.[0] || 'N/A' : 'N/A'}</p> */}
                {loader ? (
                    <div className="text-center mt-4">
                        <Spinner size="m" />
                        <Text style={{ fontSize: '0.8rem', color: 'var(--tgui--hint_color)' }}>Loading description...</Text>
                    </div>
                ) : (
                    id && description && (
                        <div className='none Text-black overflow-hidden w-11/12 mx-auto p-2' style={{ height: 'auto', borderRadius: '8px', border: '2px groove var(--tgui--subtitle_text_color)' }}>
                            <Text style={{ fontSize: '0.8rem' }}>
                                <strong>Average Time: {at}</strong>
                                <div dangerouslySetInnerHTML={{ __html: description }} />
                            </Text>
                        </div>
                    )
                )}
                <br />

                <br />
                <br />
                {
                    isModalOpen && (
                        <div
                            style={{ zIndex: 90000 }}
                            className="fixed inset-0 modal-pops  w-screen h-screen  bg-black bg-opacity-75 grid content-center  "
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

                                        <Input header="Link" disabled={type === 'Custom Comments' && true} value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter the link" />

                                        <Input type="number" header="Quantity" readOnly={type === 'Custom Comments'} value={quantity} onInput={handleInput} placeholder="Enter the quantity" />

                                        <div style={{ display: type === 'Poll' ? 'block' : 'none' }}>
                                            <Input type="text" header={type === 'Poll' ? 'Answer number' : ''} value={answernumber} onInput={(e) => setanswerNumber(e.target.value)} placeholder="Enter the Answer Number" />
                                        </div>

                                        <div style={{ display: (serviceId == 5836 || serviceId == 5648) ? 'block' : 'none' }}>
                                            <Input
                                                type="text"
                                                header="Username of the comment owner"
                                                value={usernameowner}
                                                disabled={type === 'Custom Comments' && true}
                                                onInput={(e) => setusernameOwner(e.target.value)}
                                                placeholder="Enter the username of the comment owner"
                                            />
                                        </div>
                                        <div style={{ display: type === 'Custom Comments' ? 'none' : 'none' }}>

                                            {type === 'Custom Comments' && (
                                                <>
                                                    <strong>Comment</strong>
                                                    <textarea
                                                        onChange={handleTextareaChange}
                                                        placeholder="Enter your comments here"
                                                        style={{ width: '100%', height: '100px', resize: 'none', color: 'black', border: '2px solid gray', padding: '5px', marginRight: '3rem', borderRadius: '10px' }}
                                                    ></textarea>

                                                </>
                                            )}
                                        </div>
                                        <div className='p-2 ml-4'>  {labelel}</div>
                                        <div className='p-2 ml-4'> Charge: <strong>{charge} ETB</strong></div>
                                        <div className='p-2 ml-4'> Service: {id}</div>
                                        <div className="flex mt-6  justify-between">
                                            <button
                                                disabled={disable === true}
                                                onClick={() => {
                                                    setDisable(true)
                                                    handleOrder();

                                                }}
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