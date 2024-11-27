"use client"
import { Avatar, Text } from "@telegram-apps/telegram-ui";
import { useUser } from '../UserContext'; // Adjust the path as necessary

const Lays = () => {

    const { userData } = useUser();




    return (<>
        <div style={{ 'paddingTop': '20px', 'paddingLeft': '20px' }}>
            <div className='flex'>
                <Avatar
                    size={48}
                    src={userData.profile}
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