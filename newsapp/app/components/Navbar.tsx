import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="flex flex-row shadow-md items-center p-5 bg-white">
        <h1 className="m-2 mr-10 font-sigmar text-2xl"><Link href="/">Generic News</Link></h1>
    </div>
  )
}

export default Navbar
