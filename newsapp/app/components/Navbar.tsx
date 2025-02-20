import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="flex flex-row shadow-md align-middle p-5">
        <h1 className="m-2 mr-10">Generic News</h1>
        <ol className="flex flex-row align-middle">
            <li className="m-2">
            <Link href="/">Home</Link>
            </li>
            <li className="m-2 relative group">
            <span className="cursor-pointer">Topics ▾</span>
            <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <Link href="/about">About</Link>
        </li>
      </ol>
        
    </div>
  )
}

export default Navbar
