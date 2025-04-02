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
  const [visibleCount1, setVisibleCount1] = useState(5);
  const [visibleCount2, setVisibleCount2] = useState(5);

  const loadMore1 = () => setVisibleCount1((prev) => prev + 5);
  const loadMore2 = () => setVisibleCount2((prev) => prev + 5);


  // On change of the buttons we want to fetch the corresponding data again
  useEffect(() => {
   async function fetchArticles() { 
    if(buttons.length == 1) { 
      const buttonName = buttons[0].toLowerCase().replace(/\s/g, "");

      const response = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttonName}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      setNews1(data);
      //console.log(news1);
    } else if(buttons.length == 2) { 
      const buttonName = buttons[0].toLowerCase().replace(/\s/g, "");
      const response2 = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttonName}`);
      if (!response2.ok) {
        throw new Error(`HTTP error! Status: ${response2.status}`);
      }
      const data = await response2.json()
      setNews2(data);
      console.log(news2);
    }
   };
   fetchArticles(); 
  }, [buttons])


  return (
    <div className="flex flex-row p-2 m-2">
      {/* Left Side - First News Source */}
      <div className="w-1/2 flex flex-col">
        {news1.slice(0, visibleCount1).map((item, index) => (
          <button key={index} className="bg-white p-2 m-2 font-montserrat font-bold">
            {item.titles}
          </button>
        ))}
        {news1.length > visibleCount1 && (
          <button onClick={loadMore1} className="bg-black font-montserrat text-white p-2 m-2 rounded-md">
            Add More
          </button>
        )}
      </div>

      {/* Right Side - Second News Source */}
      <div className="w-1/2 flex flex-col">
        {news2.slice(0, visibleCount2).map((item, index) => (
          <button key={index} className="bg-white p-2 m-2 font-montserrat font-bold rounded-md">
            {item.titles}
          </button>
        ))}
        {news2.length > visibleCount2 && (
          <button onClick={loadMore2} className="bg-black font-montserrat text-white p-2 m-2 rounded-md">
            Add More
          </button>
        )}
      </div>
    </div>
  );
}

export default TitleContainer