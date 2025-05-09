"use client"
import "./globals.css";
import { ActivePageProvider } from "./components/ActivePageContext"
import { UserProvider } from "./components/UserContext"
import { UserNotProvider } from "./components/StatusContext"
import Tab from './components/tab/page';
import Lays from './components/layout/page';
import { AppRoot } from "@telegram-apps/telegram-ui";
import { NextTWAProvider } from 'next-twa';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://js.chapa.co/v1/inline.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://telegram.org/js/telegram-web-app.js?2"
          strategy="lazyOnload"
        />
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
