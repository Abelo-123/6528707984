"use client"
import { Tabbar, Text } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useActivePage } from "../ActivePageContext";
import { faCalculator, faCartShopping, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
// import { useNot } from '../StatusContext';
// import { faClose, faDoorOpen, faKey } from "@fortawesome/free-solid-svg-icons";

const Tab = () => {
    // const { useNotification, setNotification } = useNot();

    const { activePage, updateActivePage } = useActivePage();

    return (

        <>
            {/* {useNotification.more && (
                <div style={{ height: '15rem', width: '10rem', background: 'var(--tgui--section_bg_color)' }} className='rounded-lg ml-auto absolute right-0 bottom-0  '>
                    <FontAwesomeIcon onClick={() => {
                        setNotification((prevNotification) => ({
                            ...prevNotification, // Spread the previous state
                            more: !useNotification.more
                            // Update the `deposit` field
                        }))
                    }} className="absolute top-3 right-3" icon={faClose} style={{ color: 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />)
                    <div style={{ height: '7rem' }}>
                        <div className="flex h-full flex-col">
                            <div className=" h-full p-2 gap-4 grid place-content-center w-full">
                                <div onClick={() => setNotification((prevNotification) => ({
                                    ...prevNotification, // Spread the previous state
                                    admin: !useNotification.admin
                                    // Update the `deposit` field
                                }))} className="grid place-content-center grid-cols-2">
                                    <FontAwesomeIcon icon={faKey} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                    <Text style={{ display: 'inline', margin: 'auto auto', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Admin</Text>
                                </div>
                                <div className="grid place-content-center grid-cols-2" onClick={() => {

                                    // Load the Telegram Web App JavaScript SDK
                                    const script = document.createElement("script");
                                    script.src = "https://telegram.org/js/telegram-web-app.js?2";
                                    script.async = true;
                                    document.body.appendChild(script);

                                    script.onload = async () => {
                                        const Telegram = window.Telegram;
                                        Telegram.WebApp.close();
                                    }

                                }}>
                                    <FontAwesomeIcon icon={faDoorOpen} style={{ 'margin': 'auto auto', color: "var(--tgui--section_header_text_color)" }} size="2x" />
                                    <Text style={{ display: 'inline', margin: 'auto 0.5rem', fontWeight: '700', color: 'var(--tgui--section_header_text_color)' }}>Exit</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            } */}
            <Tabbar style={{ background: ' var(--tgui--bg_color)', border: '2px solid transparent', display: 'grid', paddingBottom: '1rem', margin: '0', placeItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {/* <Tabbar style={{ background: ' var(--tgui--section_bg_color)', border: '2px solid transparent', display: 'grid', paddingBottom: '1rem', margin: '0', placeItems: 'center', gridTemplateColumns: 'repeat(3, 1fr)' }}> */}

                <Tabbar.Item onClick={() => updateActivePage(1)}>
                    <div className='flex flex-col '>

                        <FontAwesomeIcon icon={faCartShopping} style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} />
                        <Text weight="3" style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>New Order</Text>

                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={() => updateActivePage(2)}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faClock} style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>Orders</Text>

                    </div>
                </Tabbar.Item>

                {/* <Tabbar.Item onClick={() => updateActivePage(3)}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>account</Text>
                    </div>
                </Tabbar.Item> */}

                <Tabbar.Item onClick={() => updateActivePage(3)}>
                    <div className='flex flex-col '>
                        <FontAwesomeIcon icon={faMoneyBill} style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>Deposit</Text>
                    </div>
                </Tabbar.Item>
                {/* <Tabbar.Item onClick={() => setNotification((prevNotification) => ({
                    ...prevNotification, // Spread the previous state
                    more: !useNotification.more
                    // Update the `deposit` field
                }))}>
                    <div className='flex flex-col '>


                        <FontAwesomeIcon icon={faDotCircle} style={{ color: 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>More</Text>
                    </div>

                </Tabbar.Item> */}
                <Tabbar.Item onClick={() => updateActivePage(5)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCalculator} style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1rem' }}>theme</Text>
                    </div>
                </Tabbar.Item>
                {/* <Tabbar.Item onClick={() => updateActivePage(6)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.2rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1rem' }}>admin</Text>
                    </div>
                </Tabbar.Item> */}
            </Tabbar >

        </>
    );
}

export default Tab;