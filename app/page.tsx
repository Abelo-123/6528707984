"use client";
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';// Adjust as necessary
import React, { useEffect, useState } from 'react';
import Smm from './components/smm/smm';
import Smmhistory from './components/Smmhistory/page';
import Deposit from './components/deposit/page';
import Account from './components/Account/account';
import TelegramApp from './components/theme/theme';

import { useActivePage } from './components/ActivePageContext';

const Telegram = () => {
  const { activePage } = useActivePage();


  const [isRed, setIsRed] = useState(null); // State to toggle the red background

  useEffect(() => {
    // Trigger the red background
    setIsRed(true);

    // Remove the red background after 1 second
    const timer = setTimeout(() => {
      setIsRed(false);
    }, 500);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs once on component mount


  return (
    <>

      <AppRoot>
        <div className='w-screen' >
          {isRed && (
            <div style={{ background: 'var(--tgui--secondary_bg_color)', position: 'absolute', top: '0', zIndex: '99', bottom: '0', left: '0', right: '0', padding: '10px' }}></div>
          )}

          <div
            id="1"
            className={`w-screen ${activePage === 1 ? '' : 'hidden'}`}><Smm /></div>
          <div
            id="3"
            className={`w-screen ${activePage === 2 ? '' : 'hidden  '} `}><Smmhistory />
          </div>
          <div
            id="4"
            className={`w-screen ${activePage === 4 ? '' : 'hidden'}`}><Deposit /></div>
          <div id="5"
            className={`w-screen ${activePage === 3 ? '' : 'hidden'}`}><Account /></div>
          <div id="6"
            className={`w-screen ${activePage === 5 ? '' : 'hidden'}`}><TelegramApp /></div>
        </div>

      </AppRoot >
    </>
  );
};



export default Telegram;