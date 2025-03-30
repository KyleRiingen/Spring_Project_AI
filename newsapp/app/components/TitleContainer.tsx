"use client";
import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { ButtonContext } from '../ButtonContext';

function TitleContainer() {
  // Buttons are all the currently pressed news source buttons in local storage 
  const {buttons} = useContext(ButtonContext);
  const [news1, setNews1] = useState([]); // Keep track of all the news source elements in first news source
  const [news2, setNews2] = useState([]); // Keey track of all the elements in the second news source 
  // On change of the buttons we want to fetch the corresponding data again
  useEffect(() => {
    
  }, [buttons])


  return (
    <div className=" border ">TitleSelector</div>
  )
}

export default TitleContainer