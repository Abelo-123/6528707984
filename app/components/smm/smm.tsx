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
import Image from 'next/image'; // Import Image from 'next/image'

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
    const [bcfor, setBcfor] = useState('')
    const [mediaload, setMediaload] = useState(true);
    const [charge, setCharge] = useState(0.0);
    const [theRate, settherate] = useState(0.0);
    const [link, setLink] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const { setUserData, userData } = useUser();
    const [id, setId] = useState('')
    const [labelel, setLabel] = useState('')
    const [modalA, showModalA] = useState(false)
    const [modalB, showModalB] = useState(false)
    const [searchh, readySearch] = useState(false)
    const [search, setSearch] = useState('');
    const [searchhh, setSearchh] = useState('');
    const [servicess, setServicess] = useState([]); // All services
    const [filteredServices, setFilteredServices] = useState<any[]>([]); // Filtered services
    const [description, setDescription] = useState("")
    const [at, setAt] = useState("")
    const [promoModal, setpromoModal] = useState(false)

    const [promoCode, setPromoCode] = useState('')

    const [disable, setDisable] = useState(false)
    const [loader, showLoad] = useState(false)
    const [loadingBB, setLoadingbb] = useState(true);

    const [type, serviceType] = useState('')
    const [minn, setMin] = useState(0)
    const [maxx, setMax] = useState(0)
    const [comment, setComment] = useState(null)
    const [answernumber, setanswerNumber] = useState(null);

    const [usernameowner, setusernameOwner] = useState('')

    const [serviceId, setServiceId] = useState(null)
    const handleTextareaChange = (e) => {
        const value = e.target.value;
        const withEscapedLineBreaks = value.replace(/\n/g, '\\n');
        setComment(withEscapedLineBreaks);
        setCharge(Number(Number(value.split('\n').length * theRate * userData.allrate * userData.rate / 200 * 195 / 1000).toFixed(8)))
        setQuantity(value.split('\n').length); // Count the number of lines
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
                const auth = async () => {
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
                            }));
                        } else {
                            console.log("not")
                        }
                    }

                    supabase
                        .channel('adminmessage')
                        .on("postgres_changes", { event: "INSERT", schema: "public", table: "adminmessage" }, (payload) => {
                            if ((Number(payload.new.for) === user.id && payload.new.father === 6528707984) && payload.new.seen === true) {
                                setNotification((prevNotification) => ({
                                    ...prevNotification, // Spread the previous state
                                    notificationLight: true
                                }));
                            }
                        })
                        .subscribe();
                };

                auth();
            }
        }
    }, [setNotification]);

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
                setUserData({
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userId: user.id,
                    profile: user.photo_url,

                });
                const storageKey = `userdata_name_${user.id}`;

                const userNameFromStorage = localStorage.getItem(storageKey);

                if (userNameFromStorage) {
                    console.log('User data already exists in localStorage:', userNameFromStorage)
                    return;
                } else {
                    if (user) {
                        try {
                            const { error } = await supabase
                                .from('users')
                                .insert([
                                    { name: user.first_name, username: user?.username, profile: user.photo_url, id: user.id, father: 6528707984 }
                                ]);

                            if (error) {
                                console.error(error.message)
                            }

                            const userName = user.username;

                            localStorage.setItem(storageKey, userName);
                        } catch (error) {
                            console.error("Error adding user:", error);
                        }
                    }
                }
            } else {
                console.error("Telegram Web App API not loaded");
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [setUserData]);

    useEffect(() => {
        const fetchDescc = async () => {
            const ser = chosen.service;
            showLoad(true)
            const { data, error } = await supabase.from('desc').select('description, average_time').eq('service', ser);
            if (error) {
                console.error(error.message)
            } else {
                showLoad(false)
                setDescription(data[0].description)
                setAt(data[0].average_time)
            }
        }
        fetchDescc()
    }, [chosen.service]);

    useEffect(() => {
        async function fetchService() {
            try {
                const response = await axios.get('/api/smm/fetchService');

                setServices([response]);
                console.log(response)
                if (response) {
                    setMediaload(false)
                    function getCategory() {
                        setBcfor('Other')
                        setBc('var(--tgui--section_header_text_color)')
                        setCat(true)

                        setIcon(() => {
                            return ({ i: iconMap.other, c: '#24A1DE', n: '' })
                        })

                        setCategory(
                            response.data.response
                                .filter((datas) =>
                                    name.split(/[ ,]+/).some((word) =>
                                        datas.category.toLowerCase().includes(word.toLowerCase())
                                    )
                                )
                                .reduce((unique, datas) => {
                                    if (!unique.some((item) => item.category === datas.category)) {
                                        unique.push(datas);
                                    }
                                    return unique;
                                }, [])
                        );
                    }
                    getCategory()
                }
            } catch (error) {
                console.error('Error feching data:', error);
            }
        }

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
                    name.split(", ").some((word) => datas.category.includes(word))
                )
                .reduce((unique, datas) => {
                    if (!unique.some((item) => item.category === datas.category)) {
                        unique.push(datas);
                    }
                    return unique;
                }, [])
        );
    }

    function getRecommendedService() {
        setSer(true);
        setId(null);
        setChosen(null);
        setDescription(null);
        setAt(null);
        setBcfor('recommended');
        setBc('var(--tgui--section_header_text_color)');
        setCat(false);

        setIcon(() => {
            return { i: iconMap.other, c: '#24A1DE', n: 'Recommended Service' };
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

                    setService(recommendedServices);
                }
            } catch (err) {
                console.error('Error:', err.message);
            }
        };

        fetchRecommendedServices();

        supabase
            .channel('adminmessage-realtime')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'adminmessage', filter: `father=eq.6528707984,from=eq.Admin-re` }, (payload) => {
                const serviceIds = payload.new.message.split(',').map((id) => id.trim());
                const updatedServices = services[0]?.data?.response.filter((service) =>
                    serviceIds.includes(String(service.service))
                );
                setService(updatedServices);
            })
            .subscribe();
    }

    function getService(name, data) {
        setId(null)
        setChosen(data)
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
        showModalB(false)
        settherate(data.rate)
        setMin(data.min)
        console.log(data)
        setMax(data.max)
        setLabel(`Min: ${data.min} Max: ${data.max}`)
    }

    const handleInput = (e) => {
        setQuantity(e.target.value)
        const inputValue = e.target.value;
        setCharge(Number(Number(inputValue * theRate * userData.allrate * userData.rate / 200 * 195 / 1000).toFixed(8)))
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
                        }
                    });
                } else if (type === 'Custome Comment' && comment == null) {
                    setDisable(false)
                    Swal.fire({
                        title: 'Missing Information',
                        text: 'No Comment Provided. Please complete all required fields',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            popup: 'swal2-popup',
                            title: 'swal2-title',
                            confirmButton: 'swal2-confirm',
                            cancelButton: 'swal2-cancel'
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
                            usernames: 'user.username',
                            service: chosen.service,
                            link: link,
                            quantity: quantity,
                            charge: charge,
                            refill: chosen.refill,
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
                            const newOrder = {
                                oid: response.data.orderOid,
                                status: "Pending",
                                start_from: 0,
                                remains: quantity,
                                link: link,
                                charge: charge,
                                name: id,
                                refill: response.data.refill,
                                rtime: Date.now().toString(),
                                rt: description.match(/\d+(?=\s*Days)/)?.[0] || null,
                                date: new Date().toISOString().split('T')[0],
                                uid: user.id,
                            };

                            const event = new CustomEvent("newOrder", { detail: newOrder });
                            window.dispatchEvent(event);

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
                                            popup: 'swal2-popup',
                                            title: 'swal2-title',
                                            confirmButton: 'swal2-confirm',
                                            cancelButton: 'swal2-cancel'
                                        }
                                    });
                                    setUserData((prevNotification) => ({
                                        ...prevNotification,
                                        balance: prevNotification.balance - charge,
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
                                popup: 'swal2-popup',
                                title: 'swal2-title',
                                confirmButton: 'swal2-confirm',
                                cancelButton: 'swal2-cancel'
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

                setServicess([response.data]);
                setFilteredServices([response.data]);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();

    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchh(value);
        setLoadingbb(true);
    };

    useEffect(() => {
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
                        return -1;
                    }
                    if (!aMatch && bMatch) {
                        return 1;
                    }

                    return aService.localeCompare(bService);
                });

                setFilteredServices(sortedFiltered);
                setLoadingbb(false);
            } else {
                setFilteredServices([]);
                setLoadingbb(false);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [searchhh, servicess]);

    const clickedSearch = (service) => {
        setChose(service);
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
                            .ilike('users', `%${user.id}%`);

                        if (error) {
                            window.alert("invalid code")
                        }

                        if (data.length > 0) {
                            window.alert("contained")
                        } else {
                            const { data: rowss, error: fetchErrore } = await supabase
                                .from('users')
                                .select('balance')
                                .eq('id', user.id)
                                .single();

                            if (fetchErrore) {
                                console.error(fetchErrore.message)
                            } else {
                                const bala = rowss.balance;

                                const { data: rows, error: fetchError } = await supabase
                                    .from('promo')
                                    .select('users')
                                    .eq('code', promoCode)
                                    .single();

                                if (fetchError) {
                                    window.alert("invalid code")
                                }

                                const currentArray = rows.users || [];

                                const updatedArray = `${currentArray}, ${user.id}`;

                                const { error: updateError } = await supabase
                                    .from('promo')
                                    .update({ users: updatedArray })
                                    .eq('code', promoCode);

                                if (updateError) {
                                    throw new Error(`Error updating array: ${updateError.message}`);
                                } else {
                                    const { error } = await supabase
                                        .from('users')
                                        .update({ balance: Number(Number(bala) + Number(pb)) })
                                        .eq('id', user.id);
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
                .single();

            if (fetchError2) {
                console.log(fetchError2.message)
            } else {
                setUserData((prevNotification) => ({
                    ...prevNotification,
                    rate: Number(rate.value),
                }))
                const { data: rates, error: fetchError3 } = await supabase
                    .from('panel')
                    .select('allrate')
                    .eq('owner', 6528707984)
                    .eq('key', 'rate')
                    .single();

                if (fetchError3) {
                    console.log(fetchError3.message)
                } else {
                    setUserData((prevNotification) => ({
                        ...prevNotification,
                        allrate: Number(rates.allrate),
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
                .single();

            if (fetchError2) {
                console.log(fetchError2.message)
            } else {
                setUserData((prevNotification) => ({
                    ...prevNotification,
                    disabled: rate.bigvalue,
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
                if (payload.new.key === 'rate') {
                    setUserData((prevNotification) => ({
                        ...prevNotification,
                        rate: payload.new.value,
                    }))
                }
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'panel' }, (payload) => {
                if (payload.new.owner == 6528707984) {
                    setUserData((prevNotification) => ({
                        ...prevNotification,
                        disabled: payload.new.bigvalue,
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
                        ...prevNotificationl,
                        disabled: payload.new.bigvalue,
                    }))
                }
            })
            .subscribe();
    }, [])

    return (
        <>
            <List>
                {searchh && (
                    <div
                        style={{ background: 'var(--tgui--section_bg_color)', zIndex: 9000 }}
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
                                        {loadingBB ? (
                                            <Image
                                                src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif"
                                                alt="Loading..."
                                                width={64}
                                                height={64}
                                                className="mx-auto"
                                            />
                                        ) : (
                                            searchhh && filteredServices.length > 0 ? (
                                                filteredServices
                                                    .filter((items) => {
                                                        const disabledArray = String(userData.disabled || "").split(",");
                                                        return !disabledArray.includes(String(items.service));
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
            </List >
        </>
    );
}

export default Smm;