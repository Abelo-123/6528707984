"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Section, Spinner, List, Cell, Text, Input, Modal } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { useEffect, useState } from 'react';
import { faYoutube, faFacebook, faXTwitter, faLinkedin, faTelegram, faTiktok, faInstagram, faSpotify, faWhatsapp, faTwitch, faVk } from '@fortawesome/free-brands-svg-icons';
import { faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { useUser } from '../UserContext'; // Adjust the path as necessary

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
    const TELEGRAM_BOT_TOKEN = "7670501487:AAE78RqFbU3dfODb8-LFWNLs7mxBpJ6XnPI"; // Replace with your bot token
    const { setUserData } = useUser();


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
                const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userid}`);

                if (response.data.ok) {
                    const file_id = response.data.result.photos[0]?.[0].file_id; // Access the first photo in the first array

                    const resp = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${file_id}`);

                    if (resp.data.ok) {

                        setUserData((userData) => ({ ...userData, profile: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${resp.data.result.file_path}` }))

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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }



        fetchService()
    }, [])

    function getCategory(name, color, faicon, names) {
        setBcfor(name)
        setBc('var(--tgui--section_header_text_color)')
        setCat(true)
        setChose((chosen) => {
            [{ ...chosen, name: 'select' }]
        })
        setIcon(() => {
            return ({ i: faicon, c: color, n: names })
        })

        return setCategory(
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

    function getService(name) {
        const ser = services[0].data.response.filter((datas) => datas.category.includes(name))
        console.log(ser)
        settherate(ser[0].rate)
        return setService(ser)
    }

    function setChose(data) {
        setSer(true)
        setChosen(data)
        return console.log(chosen)
    }

    const handleInput = (e) => {
        setQuantity(e.target.value)
        const inputValue = e.target.value;
        setCharge(inputValue * theRate); // Perform the calculation
    };

    const handleOrder = () => {
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

    }

    return (

        <List>

            <Section header="Promo Code" style={{ border: '1px solid var(--tgui--section_bg_color)' }}>
                <div className="gap-x-9 relative px-6 gap-y-3 place-items-center   mx-auto h-auto grid grid-cols-3 px-4 ">
                    {mediaload && (<div style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', background: 'rgba(125, 125, 125, 0.2)' }} className='grid place-content-center absolute  top-0 bottom-0 left-0 right-0'>
                        <Spinner size="l" />
                    </div>)}
                    <div className='common-styles' onClick={() => getCategory('Youtube', '#ff0000', iconMap.youtube, 'Yooutube Service')} style={{ 'borderRadius': '10px', fontSize: '0.5rem', border: `2px solid ${bcfor == 'Youtube' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faYoutube} color="#ff0000" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>YouTube</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Tiktok', '#ffffff', iconMap.tiktok, 'Tiktok Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Tiktok' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTiktok} style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Tiktok</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Telegram', '#0088cc', iconMap.telegram, 'Telegram Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Telegram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTelegram} color="#0088cc" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Telegram</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Facebook', '#1877f2', iconMap.facebook, 'Facebook Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Facebook' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faFacebook} color="#1877f2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Facebook</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Instagram', '#c32aa3', iconMap.instagram, 'Instagram Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Instagram' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faInstagram} color="#c32aa3" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Instagram</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Twitter', '#ffffff', iconMap.twitter, 'Twitter Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitter' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faXTwitter} style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitter/X</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('LinkedIn', '#0a66c2', iconMap.linkedin, 'Linkedin Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'LinkedIn' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faLinkedin} color="#0a66c2" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>LinkedIn</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Tiktok', '#ffffff', iconMap.whatsapp, 'Tiktok Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Whatsapp' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faWhatsapp} color="#25d366" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Whatsapp</Text>
                        </div>
                    </div>
                    <div className='common-styles' onClick={() => getCategory('Twitch', '#ffffff', iconMap.twitch, 'Twitch Service')} style={{ 'borderRadius': '10px', fontSize: '0.6rem', border: `2px solid ${bcfor == 'Twitch' ? bc : 'rgba(112, 117, 121, 0.4)'}` }}>
                        <FontAwesomeIcon icon={faTwitch} color="#9146ff" style={{ 'margin': 'auto auto' }} size="2x" />
                        <div className='my-auto mx-2'>
                            <Text weight="2" style={{ fontSize: '0.9rem' }}>Twitch</Text>
                        </div>
                    </div>
                </div>
            </Section>


            <Modal
                style={{ height: '55%', padding: '1rem', background: 'var(--tgui--bg_color)' }}
                header={<ModalHeader >Only iOS header</ModalHeader>}
                trigger={
                    <Modal
                        style={{ height: '60%', padding: '1rem', background: 'var(--tgui--bg_color)' }}

                        trigger=

                        {cat &&
                            (
                                <Section header={(<div style={{ color: 'var(--tgui--section_header_text_color)' }} className=' pl-2 tgui-c3e2e598bd70eee6 tgui-080a44e6ac3f4d27 tgui-809f1f8a3f64154d   '>select</div>)} style={{ marginTop: '1rem', color: 'var(--tgui--button_text_color)', paddingLeft: '10px', border: '1px solid var(--tgui--section_bg_color)' }}>
                                    <div className="w-12/12 mx-auto  rounded-lg" style={{ fontSize: '0.8rem' }}>

                                        <div style={{ background: 'var(--tgui--bg_color)' }} className='rounded-lg flex px-2  '>
                                            {ser && (<FontAwesomeIcon icon={icon.i} color={icon.c} className=' my-auto' size="2x" />)}
                                            <div className='mx-4  font-bold text-nowrap overflow-hidden  my-auto' style={{ fontSize: '1rem' }}>
                                                <div>{chosen?.name || `Select ${icon.n}`}</div>
                                            </div>
                                            <div className='my-4 ml-auto mx-4 justify-self-end'>
                                                <FontAwesomeIcon icon={faAngleDown} color="var(--tgui--subtitle_text_color)" style={{ 'margin': 'auto auto' }} size="2x" />
                                            </div>
                                        </div>
                                    </div>
                                </Section>
                            )}

                    >

                        <DialogTitle style={{ color: 'var(--tgui--section_header_text_color)' }}><Text>1. Select category</Text></DialogTitle>
                        <List>
                            {category.map((datas, index) => (
                                <ModalClose key={index} >
                                    <Cell onClick={() => getService(datas.category)} style={{ borderRadius: '10px', borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                        <div className="   flex">
                                            <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                            <div className='ml-4' style={{ fontSize: '0.8rem' }}>{datas.category}</div>
                                        </div>
                                    </Cell>
                                </ModalClose>
                            ))}
                        </List>
                    </Modal >}
            >

                <DialogTitle style={{ color: 'var(--tgui--section_header_text_color)' }}><Text>2. Select service</Text></DialogTitle>
                <List>
                    {service.map((datas, index) => (
                        <ModalClose key={index} >
                            <Cell onClick={() => setChose(datas)} style={{ borderBottom: '1px solid var(--tgui--header_bg_color)', display: 'flex' }} >
                                <div className="   flex">
                                    <FontAwesomeIcon icon={icon.i} color={icon.c} style={{ 'margin': 'auto auto' }} size="1x" />
                                    <div className='ml-4 text-wrap' style={{ fontSize: '0.8rem' }}>{datas.name}
                                        <div className='bg-red-100 m-2 rounded-lg  p-2 inline'>ola</div>
                                    </div>

                                </div>
                            </Cell>
                        </ModalClose>
                    ))}
                </List>
            </Modal >

            {
                chosen?.name && (
                    <div className='scrollable w-11/12 mx-auto p-2' style={{ height: '10rem', overflowY: 'scroll', borderRadius: '8px', border: '2px groove var(--tgui--subtitle_text_color)' }}>
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
            <Button
                mode="filled"
                size="l"
                style={{ 'width': '96%', 'marginLeft': '2%', 'marginTop': '2%' }}
                onClick={openModal}
            >
                Action
            </Button>
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
                                {!cat && 'choose media' || !chosen?.name && `choose ${icon.n}` || cat && ser && (<>
                                    <h2 style={{ color: 'var(--tgui--section_header_text_color)' }} className="text-xl font-semibold ml-4 mb-4">Make Deposit</h2>
                                    <p className="mb-4 ml-4">Enter the amount you want to deposit:</p>
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