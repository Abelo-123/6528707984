"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, Spinner, List, Cell, Text, Input, Modal } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { useUser } from '../UserContext'; // Adjust the path as necessary
import { supabase } from '../../lib/supabaseClient'


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
};

const Smm = () => {
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
    const [checkname, setCheckname] = useState('')
    const [id, setId] = useState('')
    const [ls, setLs] = useState('')
    const [balance, setBalance] = useState(0.0)
    const [modalA, showModalA] = useState(false)
    const [modalB, showModalB] = useState(false)

    interface UserBalance {
        id: number;
        balance: number;
        // Include other fields that may exist in the `users` table
    }
    useEffect(() => {
        const auth = async () => {
            // Fetch the initial balance from the database
            const { data, error } = await supabase
                .from('users')
                .select('balance')
                .eq('id', 100)
                .single(); // Get a single row

            if (error) {
                console.error('Error fetching initial balance:', error);
            } else {
                setBalance(data.balance); // Set initial balance
            }

            // Subscribe to real-time changes
            supabase
                .channel('users:id=eq.100')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'users', filter: 'id=eq.100' }, (payload) => {
                    setBalance((payload.new as { balance: number }).balance); // Update balance on real-time changes
                })
                .subscribe();
        };

        auth();
    }, []);


    useEffect(() => {
        // Load the Telegram Web App JavaScript SDK
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?2";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const Telegram = window.Telegram;

            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.ready();

                const { user } = Telegram.WebApp.initDataUnsafe;
                setUserData({
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userId: user.id, // Store user ID

                });

                fetchUserProfilePhotos(user.id);
            } else {
                console.error("Telegram Web App API not loaded");
            } // Adjust timeout as necessary


        };


        const fetchUserProfilePhotos = async (userid) => {
            try {
                const response = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userid}`);

                if (response.data.ok) {
                    const file_id = response.data.result.photos[0]?.[0].file_id; // Access the first photo in the first array

                    const resp = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${file_id}`);

                    if (resp.data.ok) {

                        setUserData((userData) => ({ ...userData, profile: `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${resp.data.result.file_path}` }))

                    }
                    // Wrap it in an array to match the existing state structure
                }

            } catch (error) {
                console.error("Error fetching user profile photos:", error);
            }
        };

        return () => {

            document.body.removeChild(script);

        };
    }, []);


    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };



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

        async function addUser() {
            const script = document.createElement("script");
            script.src = "https://telegram.org/js/telegram-web-app.js?2";
            script.async = true;
            document.body.appendChild(script);

            script.onload = async () => {
                const Telegram = window.Telegram;

                if (window.Telegram && window.Telegram.WebApp) {
                    const { user } = Telegram.WebApp.initDataUnsafe;

                    // Generate a unique key based on the user ID or app context
                    const storageKey = "userdata_name_userid"; // Unique key for each user (or mini-app)

                    const storedData = localStorage.getItem(storageKey);

                    setLs(storedData)
                    // Check if userdata_name is already stored in localStorage for this user
                    const userNameFromStorage = localStorage.getItem(storageKey);


                    if (userNameFromStorage) {
                        console.log('User data already exists in localStorage:', userNameFromStorage);
                        return; // Do not call the API if the data is already set
                    }

                    try {




                        const response = await axios.post('/api/smm/addUser', {
                            name: user.first_name,
                            username: user.username,
                            profile: "profile",
                            id: user.id

                        });

                        const userName = response.data.userdata.name;

                        // Set user data in localStorage with a unique key
                        localStorage.setItem(storageKey, userName);  // Store the name with a unique key

                        setCheckname(userName); // Use the name from the response
                    } catch (error) {
                        console.error("Error adding user:", error);
                    }



                    // Make API call to add user

                }


            }
        }



        addUser()
        fetchService()
    }, [])

    function getCategory(name, color, faicon, names) {
        setSer(false)
        setId(null)
        setChosen([])

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

            const response = await axios.post('/api/smm/addOrder', {
                username: "userData.firstName",
                service: chosen.service,
                link: link,
                quantity: quantity,
                charge: charge,
                refill: chosen.refill,
                panel: 'smm',
                category: chosen.category,
                id: 100
            });
            if (response) {
                alert(response.data.success)
            }
        } catch (e) {

        }

    }

    return (

        <List>
            {checkname} or {ls}
            and blanace: {balance}
            <button onClick={() => {
                localStorage.clear();

            }}>
                Clean
            </button>
            <Section header="Promo Code" style={{ border: '1px solid var(--tgui--section_bg_color)' }}>
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


            {modalA &&
                <div style={{ 'zIndex': '90' }} className='scrollable modal-pop h-screen  absolute top-0 grid place-content-center bottom-0 left-0 right-0  bg-red-100 p-2'>
                    <div style={{ 'overflow': 'auto', 'height': '80%', 'width': '50rem' }} className='my-auto mx-auto p-8 bg-blue-100'>
                        <div onClick={() => showModalA(false)} className='absolute top-0 right-0 m-6 bg-blue-100 p-3'>X</div>
                        {category.map((datas, index) => (
                            <div key={index} className="p-2 py-4" onClick={() => getService(datas.category, datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <div className=" text-wrap flex">
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                    <div className='ml-4' style={{ fontSize: '0.8rem' }}>{datas.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}


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

            {modalB &&
                <div style={{ 'zIndex': '90' }} className='scrollable modal-pop h-screen  absolute top-0 grid place-content-center bottom-0 left-0 right-0  bg-red-100 p-2'>
                    <div style={{ 'overflow': 'auto', 'height': '80%', 'width': '50rem' }} className='my-auto mx-auto p-8 bg-blue-100'>
                        <div onClick={() => showModalB(false)} className='absolute top-0 right-0 m-6 bg-blue-100 p-3'>X</div>

                        {service.map((datas, index) => (

                            <div className="p-2 py-4" key={index} onClick={() => setChose(datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <div className="text-wrap flex">
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                    <div className='ml-4 text-wrap' style={{ fontSize: '0.8rem' }}>{datas.name}
                                        <div className='bg-red-100 m-2 rounded-lg  p-2 inline'>ola</div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

            <Button
                mode="filled"
                size="l"
                style={{ 'width': '96%', 'marginLeft': '2%', 'marginTop': '2%' }}
                onClick={openModal}
            >
                Action
            </Button>

            {
                id && (
                    <div className=' w-11/12 mx-auto p-2' style={{ height: 'auto', borderRadius: '8px', border: '2px groove var(--tgui--subtitle_text_color)' }}>
                        <Text style={{ fontSize: '0.8rem' }}>
                            ★ Romania Views<br />
                            ★ RAV™ - Real & Active Views<br />
                            ★ Traffic Sources: Direct Advertisement<br />
                            ★ 𝟏𝟎𝟎% 𝐖𝐚𝐭𝐜𝐡 𝐏𝐚𝐠𝐞 𝐕𝐢𝐞𝐰𝐬<br />
                            ⏱ Estimated Start: 10 Minutes<br />
                            ⚡ Speed ~200-1000+ Views Per Day<br />
                            ✔️ Views may include REAL User Engagements!<br />
                            ☔ 𝐏𝐫𝐢𝐨𝐫𝐢𝐭𝐲 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 - 𝐂𝐚𝐧𝐜𝐞𝐥 𝐀𝐧𝐲𝐭𝐢𝐦𝐞!<br />
                            *ticket us for cancellation<br />
                            🔐 𝐒𝐚𝐟𝐞 & 𝐌𝐨𝐧𝐞𝐭𝐢𝐳𝐚𝐛𝐥𝐞 𝐕𝐢𝐞𝐰𝐬!<br />
                            • Random Retention<br />
                            • 100% Real Human Viewers!<br />
                            • Stable NON-DROP Views<br />
                        </Text>
                    </div>)
            }

            {
                isModalOpen && (
                    <div
                        className="fixed inset-0 modal-pops absolute h-screen bg-black bg-opacity-75 grid content-center  z-50"
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
                                            onClick={handleOrder}
                                            style={{ background: 'var(--tgui--button_color)' }}
                                            className=" w-10/12 mx-auto text-white  px-6 py-4 rounded-md"

                                        >
                                            Make Deposit
                                        </button>

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