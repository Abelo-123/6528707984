"use client";
import { useEffect, useState } from "react";
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from '@telegram-apps/telegram-ui';// Adjust as necessary
import Smm from './components/smm/smm';
import Admin from "./components/admin/page";
import Smmhistory from './components/Smmhistory/page';
import Deposit from './components/deposit/page';
//import Account from './components/Account/account';
import TelegramApp from './components/theme/theme';
import React from "react";
//import { useNot } from "./components/StatusContext";
import { useActivePage } from './components/ActivePageContext';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';

const Telegram = () => {
  const { activePage } = useActivePage();

  // const [form, openForm] = useState(false)
  // const { useNotification, setNotification } = useNot();

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
          {/* {useNotification.admin && (
            <div

              className="fixed inset-0 modal-pops  w-screen h-screen  bg-black bg-opacity-75 grid content-center  z-50"

            >
              <div
                style={{ width: '90%', background: 'var(--tgui--bg_color)' }}
                className=" modal-pop mx-auto lg:w-4/12  px-2 py-8 rounded-lg relative w-96"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
              >


                <div
                  className=" text-gray-500 absolute m-2 right-0  top-0 px-4 py-3 rounded-md"
                  onClick={() => {
                    setNotification((prevNotification) => ({
                      ...prevNotification, // Spread the previous state
                      admin: !useNotification.admin,
                      more: !useNotification.more
                      // Update the `deposit` field
                    })
                    )

                  }}
                >
                  <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto', color: 'var(--tgui--section_header_text_color)' }} size="2x" />
                </div>
                <button

                  onClick={() => {
                    openForm(!form)
                  }}
                  style={{ background: 'var(--tgui--button_color)' }}
                  className=" w-10/12 mx-auto text-white  px-6 py-4 rounded-md"
                >
                  Modal</button>

              </div>
            </div>
          )

          }
          {form && (
            <div

              className="fixed inset-0 modal-pops  w-screen h-screen  bg-black bg-opacity-0 grid content-center  z-50"

            >
              <div
                style={{ width: '90%', background: 'var(--tgui--bg_color)' }}
                className=" modal-pop block mx-auto lg:w-4/12  px-2 py-8 rounded-lg relative w-96"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
              >

                <div
                  className=" text-gray-500 absolute m-2 right-0  top-0 px-4 py-3 rounded-md"
                  onClick={() => {
                    setNotification((prevNotification) => ({
                      ...prevNotification, // Spread the previous state
                      admin: !useNotification.admin,
                      more: false
                      // Update the `deposit` field
                    })

                    )
                    openForm(!form)
                  }}
                >
                  <FontAwesomeIcon icon={faClose} style={{ 'margin': 'auto auto', color: 'var(--tgui--section_header_text_color)' }} size="2x" />
                </div>
                <div>d</div>
                <button
                  onClick={() => {
                    openForm(!form)
                  }}
                  style={{ background: 'var(--tgui--button_color)' }}
                  className=" w-10/12 mx-auto text-white  px-6 py-4 rounded-md"
                >
                  Modal</button>
              </div>
            </div>

          )

          } */}
          <div
            id="1"
            className={`w-screen ${activePage === 1 ? '' : 'hidden'}`}><Smm /></div>
          <div
            id="2"
            className={`w-screen ${activePage === 2 ? '' : 'hidden  '} `}><Smmhistory />
          </div>
          <div
            id="3"
            className={`w-screen ${activePage === 3 ? '' : 'hidden'}`}><Deposit /></div>
          {/* <div id="5"
            className={`w-screen ${activePage === 3 ? '' : 'hidden'}`}><Account /></div> */}
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