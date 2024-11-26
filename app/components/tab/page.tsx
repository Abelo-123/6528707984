"use client"
import { Tabbar, Text } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useActivePage } from "../ActivePageContext";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const Tab = () => {

    const { activePage, updateActivePage } = useActivePage();

    return (

        <>

            <Tabbar style={{ background: 'none', border: '2px solid transparent', display: 'grid', margin: '0rem', placeItems: 'center', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <Tabbar.Item onClick={() => updateActivePage(1)}>
                    <div className='flex flex-col'>

                        <FontAwesomeIcon icon={faClock} style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.1rem' }} />
                        <Text weight="3" style={{ color: activePage === 1 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>orderhistory</Text>
                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={() => updateActivePage(2)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faFacebookMessenger} style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.1rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 2 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>smm</Text>
                    </div>
                </Tabbar.Item>

                <Tabbar.Item onClick={() => updateActivePage(3)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.1rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 3 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>account</Text>
                    </div>
                </Tabbar.Item>

                <Tabbar.Item onClick={() => updateActivePage(4)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 4 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.1rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 4 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '0.82rem' }}>deposit</Text>
                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={() => updateActivePage(5)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1.1rem' }} size="1x" />
                        <Text weight="3" style={{ color: activePage === 5 ? 'var(--tgui--link_color)' : 'var(--tgui--subtitle_text_color)', fontSize: '1rem' }}>theme</Text>
                    </div>
                </Tabbar.Item>
            </Tabbar>

        </>
    );
}

export default Tab;