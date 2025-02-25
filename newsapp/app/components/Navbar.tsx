import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

function Navbar() {
  const {data: session } = useSession();
  return (
    <div className="flex flex-row shadow-md items-center p-5">
        <h1 className="m-2 mr-10">Generic News</h1>
        <ol className="flex flex-row items-center justify-between">
          <li className="m-2">
            <Link href="/">Home</Link>
          </li>
          <li className="m-2 relative group">
            <span className="cursor-pointer">Topics ▾</span>
            <ul className="absolute left-0 -mt-1 bg-white border rounded-md shadow-md hidden group-hover:flex flex-col transition-opacity duration-300 z-50">
              <li className="p-2 hover:bg-gray-200">
                <Link href="/topics/sports">Sports</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link href="/topics/technology">Technology</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <Link href="/topics/politics">Politics</Link>
              </li>
            </ul>
          </li>
          <li className="m-2">
            <Link href="/about" className="">About</Link>
          </li>
      </ol>  
      
      <div className="flex flex-row flex-grow justify-end align-center">
        {!session ? (
          // If session is null, show SignIn button
          <div className="flex align-center m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
            <Link href="/api/auth/signin" className="text-white p-2">SignIn</Link>
          </div>
        ) : (
          // If session exists, show the user profile or logout option
          <div className="flex flex-row">
            <div className="flex align-center m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <Link href="/profile" className="text-white p-2">Profile</Link>
            </div>
            <div className="flex align-center p-2 m-2 bg-neutral-950 hover:bg-neutral-600 rounded-md">
              <button className="text-white" onClick={() => {signOut()}}>Sign Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
