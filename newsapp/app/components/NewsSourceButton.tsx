"use client";

import React, { useState, useContext} from "react";
import { ButtonContext } from "../ButtonContext";

function NewsSourceButton({name}: {name: string}) { 
    const [buttonClicked, setButtonClicked] = useState(false);
    // Comes from the Button Context keeps track of buttons pressed 
    const {buttons, addButton, removeButton, canSelectMore} = useContext(ButtonContext); 
    const isSelected = buttons.includes(name);
    

  return (
    <div
      className={`w-40 h-40 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition 
                  ${buttonClicked ? "border-2 border-blue-500 shadow-lg" : "shadow-md hover:shadow-black bg-white"}`}
      onClick={() => {
        const more = canSelectMore();    
        console.log(more);     
        if(isSelected) { 
            removeButton(name);
            setButtonClicked(!buttonClicked);
        } else if (more) { 
            addButton(name);
            setButtonClicked(!buttonClicked);
        }
      }}
    >
      {name}
    </div>
  );
}

export default NewsSourceButton;