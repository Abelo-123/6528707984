"use client";
import { useEffect } from "react";
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';// Adjust as necessary
import Smm from './components/smm/smm';
import Admin from "./components/admin/page";
import Smmhistory from './components/Smmhistory/page';
import Deposit from './components/deposit/page';
import Account from './components/Account/account';
import TelegramApp from './components/theme/theme';
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useActivePage } from './components/ActivePageContext';

function Content() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data"); // Fetch the "data" parameter from the URL

  return <p>Data: {data}</p>; // Display the data
}

const Telegram = () => {
  const { activePage } = useActivePage();


  useEffect(() => {
    // Load the Telegram Web App JavaScript SDK
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js?2";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const Telegram = window.Telegram;

      if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.expand() // Get the app version

      }

    };



    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <>

      <AppRoot>
        <div className='w-screen' >

          <Suspense fallback={<p>Loading data...</p>}>
            <Content />
          </Suspense>
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
          <div id="7"
            className={`w-screen ${activePage === 6 ? '' : 'hidden'}`}><Admin /></div>
        </div>

      </AppRoot >
    </>
  );
};



export default Telegram;