"use client"
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { ActivePageProvider } from "./components/ActivePageContext"
import Tab from './components/tab/page';
import Lays from './components/layout/page';
import { AppRoot } from "@telegram-apps/telegram-ui";
import { NextTWAProvider } from 'next-twa';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [normal, isNormal] = useState(null);
  const [setVersion] = useState(null);
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
        const telegramVersion = Telegram.WebApp.version; // Get the app version
        if (telegramVersion > 7.9) {
          isNormal(true)
          setVersion(telegramVersion)
        } else if (telegramVersion < 8.0) {
          isNormal(false)
          setVersion(telegramVersion)
        }
      }

    };
  })

  return (
    <html lang="en">
      <body
        className={normal ? ` ${geistSans.variable} ${geistMono.variable} antialiased` : `${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTWAProvider >
          <ActivePageProvider>
            <AppRoot>
              <Lays />

              {children}
              <Tab />

            </AppRoot>
          </ActivePageProvider>
        </NextTWAProvider>
      </body>
    </html>
  );
}
