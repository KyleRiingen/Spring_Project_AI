// We are telling nextJS this is only a client component now by default all components are server components
"use client";
import React from "react";
import Footer from "./components/Footer";
import "./globals.css"
import { Sigmar, Montserrat } from "next/font/google"
import ButtonContext from "./ButtonContext"

const sigmar = Sigmar({
  subsets: ["latin"],
  variable: "--font-sigmar",
  weight: "400"
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400"
})

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
      <body className={`${sigmar.variable} ${montserrat.variable} bg-stone-50`} >
        <ButtonContext>
          {children}
          <Footer /> 
        </ButtonContext>
          
      </body>
    </html>
  );
}
