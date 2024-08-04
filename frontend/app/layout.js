"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-[#FDFDFD]'>
      <UserProvider>
        <body className={inter.className}>
          <NavBar/>
          <div className='mt-24'>
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
