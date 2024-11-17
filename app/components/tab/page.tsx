"use client"
import { Tabbar, Text } from "@telegram-apps/telegram-ui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faClock, faCoins, faUser } from '@fortawesome/free-solid-svg-icons';
import { useActivePage } from "../ActivePageContext";

const Tab = () => {

    const { activePage, updateActivePage } = useActivePage();

    return (

        <>

            <Tabbar style={{ background: 'var(--tgui--secondary_bg_color)', display: 'grid', margin: '0rem', placeItems: 'center', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <Tabbar.Item onClick={() => updateActivePage(1)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faClock} style={{ color: activePage === 1 ? 'blue' : 'black', fontSize: '1.6rem' }} />
                        <Text weight="3" style={{ color: 'black', fontSize: '1rem' }}>orderhistory</Text>
                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={() => updateActivePage(2)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faYoutube} style={{ color: activePage === 2 ? 'blue' : 'black', fontSize: '1.6rem' }} size="2x" />
                        <Text weight="3" style={{ color: 'black', fontSize: '1rem' }}>smm</Text>
                    </div>
                </Tabbar.Item>

                <Tabbar.Item onClick={() => updateActivePage(3)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faUser} style={{ color: activePage === 3 ? 'blue' : 'black', fontSize: '1.6rem' }} size="2x" />
                        <Text weight="3" style={{ color: 'black', fontSize: '1rem' }}>account</Text>
                    </div>
                </Tabbar.Item>

                <Tabbar.Item onClick={() => updateActivePage(4)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCoins} style={{ color: activePage === 4 ? 'blue' : 'black', fontSize: '1.6rem' }} size="2x" />
                        <Text weight="3" style={{ color: 'black', fontSize: '1rem' }}>deposit</Text>
                    </div>
                </Tabbar.Item>
                <Tabbar.Item onClick={() => updateActivePage(5)}>
                    <div className='flex flex-col'>
                        <FontAwesomeIcon icon={faCoins} style={{ color: activePage === 5 ? 'blue' : 'black', fontSize: '1.6rem' }} size="2x" />
                        <Text weight="3" style={{ color: 'black', fontSize: '1rem' }}>theme</Text>
                    </div>
                </Tabbar.Item>
            </Tabbar>

        </>
    );
}

export default Tab;