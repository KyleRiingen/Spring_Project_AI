"use client";
import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { ButtonContext } from '../ButtonContext';
import TitleButton from './TitleButton';

interface Article { 
  titles: string; 
}
function TitleContainer() {
  // Buttons are all the currently pressed news source buttons in local storage 
  const {buttons} = useContext(ButtonContext); // Array of names of news sources from button context

  const [news1, setNews1] = useState<Article[]>([]); // all news1 titles 
  const [news2, setNews2] = useState<Article[]>([]); // all news2 titles

  const [visibleCount1, setVisibleCount1] = useState(5); // amount of titles that should be visible for news1
  const [visibleCount2, setVisibleCount2] = useState(5); // amount of titles that should be visible for news2

  const [selectedTitles, setSelectedTitles] = useState([]);

  const loadMore1 = () => setVisibleCount1((prev) => prev + 5); // increase amount of visible titles news1
  const loadMore2 = () => setVisibleCount2((prev) => prev + 5); // increase amount of visible titles news2

  // On change of the buttons we want to fetch the corresponding data again
  useEffect(() => {
    async function fetchArticles() {
      try {
        if (buttons.length === 1) {
          const buttonName = buttons[0].toLowerCase().replace(/\s/g, "");
          const response = await fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttonName}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setNews1(data);
          setNews2([]); // Clear second news set if only one button is selected
        } 
        else if (buttons.length === 2) {
          const buttonName1 = buttons[0].toLowerCase().replace(/\s/g, "");
          const buttonName2 = buttons[1].toLowerCase().replace(/\s/g, "");
  
          // Fetch both news sources in parallel
          const [response1, response2] = await Promise.all([
            fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttonName1}`),
            fetch(`http://${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${buttonName2}`)
          ]);
  
          if (!response1.ok || !response2.ok) {
            throw new Error(`HTTP error! Status: ${response1.status}, ${response2.status}`);
          }
  
          const [data1, data2] = await Promise.all([response1.json(), response2.json()]);
  
          setNews1(data1);
          setNews2(data2);
        } 
        else {
          setNews1([]);
          setNews2([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
  
    fetchArticles();
  }, [buttons]);


  return (
    <div className="flex flex-row p-2 m-2">

      {/* Left Side - First News Source */}
      <div className="w-1/2 flex flex-col">
        <div className="font-sigmar flex items-center justify-center text-2xl font-bold">
        {buttons[0] ? (
            <h1>
              {buttons[0].toUpperCase()}
            </h1>
          ):(
            <h1>Select an option above</h1>
          )}
        </div>
        {news1.slice(0, visibleCount1).map((item, index) => (
          <TitleButton title={item.titles} key={index}/>
        ))}
        {news1.length > visibleCount1 && (
          <button onClick={loadMore1} className="bg-black font-montserrat text-white p-2 m-2 rounded-md">
            Add More
          </button>
        )}
      </div>

      {/* Right Side - Second News Source */}
      <div className="w-1/2 flex flex-col">
        <div className="font-sigmar flex items-center justify-center text-2xl font-bold">
          {buttons[1] ? (
            <h1>
              {buttons[1].toUpperCase()}
            </h1>
          ):(
            <h1>Select an option above</h1>
          )}
        </div>
        {news2.slice(0, visibleCount2).map((item, index) => (
          <TitleButton title={item.titles} key={index}/>
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