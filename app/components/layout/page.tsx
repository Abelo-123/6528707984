"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useUser } from '../UserContext'; // Adjust the path as necessary
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useNot } from '../StatusContext';


const Lays = () => {
    // const [notificationModal, seeNotificationModal] = useState(false)
    const { userData, setUserData } = useUser();
    const [marq, setMarq] = useState('')
    const { setNotification } = useNot();
    const [balance, setBalance] = useState(0.0)

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

        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js?2";
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
            const Telegram = window.Telegram;

            if (window.Telegram && window.Telegram.WebApp) {

                const { user } = Telegram.WebApp.initDataUnsafe;



                const fetchBalance = async () => {
                    const { data, error } = await supabase
                        .from('users')
                        .select('balance')
                        .eq('id', 7159821786)
                        .single(); // Get a single row

                    if (error) {
                        console.error('Error fetching initial balance:', error);
                    } else {

                        setUserData((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            balance: data.balance,
                            // Update the `deposit` field
                        }));
                        setBalance(data.balance)

                    }
                }
                fetchBalance()

                supabase
                    .channel(`users:id=eq.${user.id}`)
                    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${user.id}` }, (payload) => {

                        setUserData((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            balance: payload.new.balance,
                            // Update the `deposit` field
                        }));
                        setBalance(payload.new.balance);
                    })
                    .subscribe();
            }
        }
    }, [])


    const { useNotification } = useNot();

    const seeNotification = async () => {



        setNotification((prevNotification) => ({
            ...prevNotification, // Spread the previous state
            notificationModal: true,
            smmModal: true,
            // Update the `deposit` field
        }));

        const { data: setNotify, error: setError } = await supabase
            .from('adminmessage')
            .select('*')
            .eq('for', userData.userId)

        if (setError) {
            console.error('Error fetching initial balance:', setError);
        } else {

            setNotification((prevNotification) => ({
                ...prevNotification, // Spread the previous state
                notificationLoader: false,
                notificationData: setNotify,
                notificationLight: false,
                // Update the `deposit` field
            }));
        }


        const { error: errorb } = await supabase.from('adminmessage').update({ seen: false }).eq('for', userData.userId); // Update all rows where `did` is greater than 0
        if (errorb) {
            console.error(errorb.message)
        }
    }





    return (<>

        <div className="flex ">
            <div className="flex w-full " style={{ 'paddingTop': '20px', 'paddingLeft': '20px' }}>
                <div className='flex'>
                    <Avatar
                        size={48}
                        src={userData.profile}
                    />

                    <div className='flex flex-col justify-space-around mt-auto  ml-3'>
                        <Text weight="2">{userData.firstName} {userData.lastName}</Text>
                        <Text weight="3" style={{ 'fontSize': '13px' }}>Balance {balance} ETB</Text>
                    </div>
                </div>
                <div onClick={seeNotification} style={{ position: 'relative' }} className="grid place-content-center ml-auto mr-8 ">
                    <div className="flex">
                        <FontAwesomeIcon style={{ color: 'var(--tgui--section_header_text_color)' }} size="1x" icon={faBell} />
                        {useNotification.notificationLight === true ? (
                            <div style={{ position: 'absolute', right: '0', padding: '0.3rem', height: '0.3rem', borderRadius: '100px', background: 'red' }}></div>
                        ) : (<></>)}
                    </div>
                </div>
            </div>

        </div>
        <marquee style={{ marginTop: '0.5rem' }}>
            <Text style={{ color: 'var(--tgui--hint_color)' }}>{marq}</Text></marquee>

    </>);
}

export default Lays;