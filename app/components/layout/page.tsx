"use client"
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useNextTWA } from 'next-twa';


const Lays = () => {
    const { app } = useNextTWA();

    return (<>
        <div style={{ 'paddingTop': '20px', 'paddingLeft': '20px' }}>
            <div className='flex'>
                <Avatar
                    size={48}
                    src="https://avatars.githubusercontent.com/u/84640980?v=4"
                />
                <div className='flex flex-col justify-space-around mt-auto  ml-3'>
                    <Text weight="2">{app?.initDataUnsafe.user?.username}</Text>
                    <Text weight="3" style={{ 'fontSize': '13px' }}>Balance</Text>
                </div>
            </div>
        </div>
    </>);
}

export default Lays;