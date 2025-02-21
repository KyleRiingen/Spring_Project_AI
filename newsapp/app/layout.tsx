import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css"

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
        <Navbar />
        {children}
        <Footer /> 
      </body>
    </html>
  );
}
