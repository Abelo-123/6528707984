"use client"
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

  return (
    <html lang="en">
      <body
        className={`mt-14 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTWAProvider>
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
