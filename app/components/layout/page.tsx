"use client"
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useUser } from '../UserContext'; // Adjust the path as necessary

const Lays = () => {

    const TELEGRAM_BOT_TOKEN = "7670501487:AAE78RqFbU3dfODb8-LFWNLs7mxBpJ6XnPI"; // Replace with your bot token

    const [ph] = useState('')
    const { userData } = useUser();




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