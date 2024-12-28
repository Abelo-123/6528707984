"use client"
import { Tabbar, Text } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useActivePage } from "../ActivePageContext";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { useNot } from '../StatusContext';
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

const Tab = () => {

    const { activePage, updateActivePage } = useActivePage();
    const { useNotification, setNotification } = useNot();
    const [display, setDisplay] = useState(true);

    const handleTwo = async () => {
        if (useNotification.order == true) {
            setDisplay(false)
        } else {
            setDisplay(true)
        }


        updateActivePage(2)
        setNotification((prevNotification) => ({
            ...prevNotification, // Spread the previous state
            order: false,
            id: 0,
            // Update the `deposit` field
        }));
        const delay = (ms: number) => new Promise(resolve => {
            const interval = setInterval(() => {
                clearInterval(interval);
                resolve(true);
            }, ms);
        });

        if (useNotification.order === true) {

            try {
                await delay(3000); // Wait for 2 seconds


                const { error } = await supabase.from('orders').update({ panel: 'fixed' });
                // setDescription([response.data.success[0]])
                if (error) {
                    console.error(error.message)
                }

                setNotification((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    order: false,
                    id: 0
                }));
                setDisplay(true)

            } catch (e) {
                console.error(e.message)
            }
        }
    }
    return (

        <>

            <Tabbar style={{ background: ' var(--tgui--bg_color)', border: '2px solid transparent', display: 'grid', margin: '0rem', placeItems: 'center', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <Tabbar.Item onClick={() => updateActivePage(1)}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faClock} style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} />
                        <Text weight="3" style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>New Order</Text>
                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={handleTwo}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faFacebookMessenger} style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>Orders</Text>

                    </div>
                </Tabbar.Item>

                {/* <Tabbar.Item onClick={() => updateActivePage(3)}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>account</Text>
                    </div>
                </Tabbar.Item> */}

                <Tabbar.Item onClick={() => updateActivePage(4)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 4 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 4 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>Deposit</Text>
                    </div>
                </Tabbar.Item>
                {/* <Tabbar.Item onClick={() => updateActivePage(5)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1rem' }}>theme</Text>
                    </div>
                </Tabbar.Item> */}
                {/* <Tabbar.Item onClick={() => updateActivePage(6)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1rem' }}>admin</Text>
                    </div>
                </Tabbar.Item> */}
            </Tabbar>

        </>
    );
}

export default Tab;