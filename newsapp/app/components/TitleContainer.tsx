"use client";
import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { ButtonContext } from '../ButtonContext';

interface Article { 
  titles: string; 
}
function TitleContainer() {
  // Buttons are all the currently pressed news source buttons in local storage 
  const {buttons} = useContext(ButtonContext); // Array of names of news source
  const [news1, setNews1] = useState<Article[]>([]);
  const [news2, setNews2] = useState<Article[]>([]); 

  // On change of the buttons we want to fetch the corresponding data again
  useEffect(() => {
   async function fetchArticles() { 
    if(buttons.length == 1) { 
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttons[0].toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      setNews1(data);
      console.log(news1);
    } else if(buttons.length == 2) { 
      const response2 = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttons[1].toLowerCase()}`);
      if (!response2.ok) {
        throw new Error(`HTTP error! Status: ${response2.status}`);
      }
      const data = await response2.json()
      setNews2(data);
    }
   };
   fetchArticles(); 
  }, [buttons])


  return (
    <div className=" border ">
      {/* Left Side Second News Source */}
      <div className="w-1/2">
        {news1.map((item, index) => (
          <button key={index} className="bg-white p-2 m-2 font-montserrat">{item.titles}</button>
        ))}
      </div>
      {/* Right Side Second News Source */}
      <div className="w-1/2">

      </div>
    </div>
  )
}

export default TitleContainer