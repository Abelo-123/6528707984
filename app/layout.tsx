"use client"
// import { useEffect, useState } from "react";
// import { useUser } from "./components/UserContext";
import "./globals.css";
import { ActivePageProvider } from "./components/ActivePageContext"
import { UserProvider } from "./components/UserContext"
import { UserNotProvider } from "./components/StatusContext"
import Tab from './components/tab/page';
import Lays from './components/layout/page';
import { AppRoot } from "@telegram-apps/telegram-ui";
import { NextTWAProvider } from 'next-twa';
//import { supabase } from "./lib/supabaseClient";







export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [normal, isNormal] = useState(null);
  // const [setVersion] = useState(null);
  // // const userData = useUser()
  // useEffect(() => {
  //   // Load the Telegram Web App JavaScript SDK
  //   const script = document.createElement("script");
  //   script.src = "https://telegram.org/js/telegram-web-app.js?2";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     const Telegram = window.Telegram;

  //     if (window.Telegram && window.Telegram.WebApp) {
  //       Telegram.WebApp.expand() // Get the app version
  //       const telegramVersion = Telegram.WebApp.version; // Get the app version
  //       if (telegramVersion > 7.9) {
  //         isNormal(true)
  //         setVersion(telegramVersion)
  //       } else if (telegramVersion < 8.0) {
  //         isNormal(false)
  //         setVersion(telegramVersion)
  //       }
  //     }

  //   };
  // })


  return (
    <html lang="en">
      <head>
        {/* <Script
          src="https://js.chapa.co/v1/inline.js"
          strategy="beforeInteractive"
        /> */}
      </head>
      <body >
        <NextTWAProvider >
          <ActivePageProvider>
            <UserProvider>
              <UserNotProvider>
                <AppRoot>

                  <Lays />

                  {children}
                  <Tab />

                </AppRoot>
              </UserNotProvider>
            </UserProvider>
          </ActivePageProvider>
        </NextTWAProvider>
      </body>
    </html>
  );
}
