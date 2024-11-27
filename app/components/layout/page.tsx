"use client"
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from '../UserContext'; // Adjust the path as necessary

const Lays = () => {

    const TELEGRAM_BOT_TOKEN = "7670501487:AAE78RqFbU3dfODb8-LFWNLs7mxBpJ6XnPI"; // Replace with your bot token

    const [ph, setPh] = useState('')
    const { userData, setUserData } = useUser();


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
                        setPh(resp.data.result.file_path);
                        setUserData((userData) => ({ ...userData, profile: resp.data.result.file_path }))
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


    return (<>
        <div style={{ 'paddingTop': '20px', 'paddingLeft': '20px' }}>
            <div className='flex'>
                <Avatar
                    size={48}
                    src={`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${ph}`}
                />
                <div className='flex flex-col justify-space-around mt-auto  ml-3'>
                    <Text weight="2">{userData.firstName} {userData.lastName}</Text>
                    <Text weight="3" style={{ 'fontSize': '13px' }}>Balance</Text>
                </div>
            </div>
        </div>
    </>);
}

export default Lays;