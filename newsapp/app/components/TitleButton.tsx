"use client";
import React, {useState} from 'react'

interface TitleButtonProps { 
    title: string
}

function TitleButton({title}: TitleButtonProps) {
    const [clicked, setClicked] = useState(false); 

    return (
        <button className ={`bg-white p-2 m-2 border-2 font-montserrat ${clicked ? ("border-2 border-blue-500 shadow-lg"): ("border-none")} font-bold flex items-center justify-center`} onClick={() => setClicked(!clicked)}>
            {title}
        </button>
    )
}

export default TitleButton
