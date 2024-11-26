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

  }, []);



  return (
    <>

      <AppRoot>
        <div className='w-screen'>

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