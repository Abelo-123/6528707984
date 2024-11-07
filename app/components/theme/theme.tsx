"use client";

import '@telegram-apps/telegram-ui/dist/styles.css';
import { AvatarStack, AppRoot, Avatar } from '@telegram-apps/telegram-ui';// Adjust as necessary
import { useEffect, useState } from "react";
import axios from "axios";

const TELEGRAM_BOT_TOKEN = "7670501487:AAE78RqFbU3dfODb8-LFWNLs7mxBpJ6XnPI"; // Replace with your bot token

// ... existing imports ...
// Create a new TypeScript declaration file (e.g., `telegram.d.ts`)
// Or add this at the top of your `page.tsx` file

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initDataUnsafe: {
                    user: {
                        id: number; // User ID
                        username: string;
                        first_name: string;
                        last_name: string;
                    };
                };
                hideHeader: () => void;
                ready: () => void; // Add colorScheme to detect light/dark mode
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    link_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                    secondary_bg_color?: string;
                    header_bg_color?: string;
                    bottom_bar_bg_color?: string;
                    accent_text_color?: string;
                    section_bg_color?: string;
                    section_header_text_color?: string;
                    subtitle_text_color?: string;
                    destructive_text_color?: string;
                };
            };
        };
    }
}


const TelegramApp = () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    // Your code where this rule should be ignored
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        userId: undefined, // Initialize userId
    });
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const [ph, setPh] = useState('')
    const [theme, setTheme] = useState<{
        bg_color?: string;
        text_color?: string;
        hint_color?: string;
        link_color?: string;
        button_color?: string;
        button_text_color?: string;
        secondary_bg_color?: string;
        header_bg_color?: string;
        bottom_bar_bg_color?: string;
        accent_text_color?: string;
        section_bg_color?: string;
        section_header_text_color?: string;
        subtitle_text_color?: string;
        destructive_text_color?: string;
    }>({});
    const [isAppReady, setIsAppReady] = useState(false);


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
                const themeParams = window.Telegram.WebApp.themeParams;
                setUserData({
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    userId: user.id, // Store user ID
                });
                setTheme(themeParams);
                // Fetch user profile photos
                fetchUserProfilePhotos(user.id);
                setIsAppReady(true);
            } else {
                console.error("Telegram Web App API not loaded");
            } // Adjust timeout as necessary


        };



        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchUserProfilePhotos = async (userid) => {
        try {
            const response = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUserProfilePhotos?user_id=${userid}`);

            if (response.data.ok) {
                const file_id = response.data.result.photos[0]?.[0].file_id; // Access the first photo in the first array

                const resp = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${file_id}`);

                if (resp.data.ok) {
                    setPh(resp.data.result.file_path);
                }
                // Wrap it in an array to match the existing state structure
            }

        } catch (error) {
            console.error("Error fetching user profile photos:", error);
        }
    };


    return (
        <div>
            {!isAppReady ? (
                // Loader component or element
                <div>
                    <p>Loading...</p>
                    {/* Add your loader animation or spinner here */}
                </div>
            ) : (
                // Main content of your mini app
                <div>
                    <p>section_bg Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.section_bg_color }}>Lorem</div></p>
                    <p>Background Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.bg_color }}>Lorem</div></p>
                    <p>Text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.text_color }}>Lorem</div></p>
                    <p>Hint Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.hint_color }}>Lorem</div></p>
                    <p>link  Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.link_color }}>Lorem</div></p>
                    <p>button Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.button_color }}>Lorem</div></p>
                    <p>button text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.button_text_color }}>Lorem</div></p>
                    <p>secondary bg Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.secondary_bg_color }}>Lorem</div></p>
                    <p>header bg Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.header_bg_color }}>Lorem</div></p>
                    <p>bottom bar Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.bottom_bar_bg_color }}>Lorem</div></p>
                    <p>accecnt text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.accent_text_color }}>Lorem</div></p>
                    <p>section_header text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.section_header_text_color }}>Lorem</div></p>
                    <p>subtitle text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.subtitle_text_color }}>Lorem</div></p>
                    <p>desctructive text Color: <div style={{ 'padding': '15px', 'backgroundColor': theme.destructive_text_color }}>Lorem</div></p>
                    <h2>{userData.firstName} {userData.lastName}</h2>
                    <p>Username: @{userData.username}</p>
                    <p>User ID: {userData.userId}</p> {/* Display user ID */}

                    <img src={`https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${ph}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                    <AppRoot>
                        <AvatarStack>
                            <Avatar
                                size={48}
                                src="https://avatars.githubusercontent.com/u/84640980?v=4"
                            />
                            <Avatar
                                size={48}
                                src="https://avatars.githubusercontent.com/u/84640980?v=4"
                            />
                            <Avatar
                                size={48}
                                src="https://avatars.githubusercontent.com/u/84640980?v=4"
                            />
                            <Avatar
                                size={48}
                                src="https://avatars.githubusercontent.com/u/84640980?v=4"
                            />
                        </AvatarStack>
                    </AppRoot>

                </div>
            )}
        </div>
    );
};


export default TelegramApp;