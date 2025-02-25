// We are telling nextJS this is only a client component now by default all components are server components
"use client";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css"
import { SessionProvider } from "next-auth/react";


// Looks bad but the RootLayout is used to wrap all the components of our application.
// Since we want the NavBar and Footer to be on every page of the application this layout does that 
// and sandwhiches all the other components between the two 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider >
          <Navbar />
          {children}
          <Footer /> 
        </SessionProvider>
      </body>
    </html>
  );
}
