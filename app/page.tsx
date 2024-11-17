"use client";
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';// Adjust as necessary
import React, { useEffect } from 'react';
import Smm from './components/smm/smm';
import Smmhistory from './components/Smmhistory/page';
import Deposit from './components/deposit/page';
import Account from './components/Account/account';
import TelegramApp from './components/theme/theme';

import { useActivePage } from './components/ActivePageContext';

const Telegram = () => {
  const { activePage } = useActivePage();


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?2";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        //window.Telegram.WebApp.ready();
        // Use type assertion to bypass the TypeScript error
        //(window.Telegram.WebApp as TelegramWebApp).expand();
      }
    };

    // Cleanup: remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    <>

      <AppRoot>
        <div className='w-screen'>

          <div
            id="1"
            className={`w-screen ${activePage === 2 ? '' : 'hidden'}`}><Smm /></div>
          <div
            id="3"
            className={`w-screen ${activePage === 1 ? '' : 'hidden  '} px-2`}><Smmhistory />
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