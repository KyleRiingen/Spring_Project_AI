"use client";
// The reason created this here is to use the use client button to keep track of the state of the button 
// if it is selected. For almost every occurence where you can you want to use server side rendering 
// because its faster so only use client components in the lowest levels. 
import React from 'react';

// Type of the prop is going to be a string 
interface NewsSourceButtonProps {
  name: string;
}

// Type is a react functional component of the type string basically for the name
const NewsSourceButton: React.FC<NewsSourceButtonProps> = ({ name }) => {
  return (
    <div className="bg-white shadow-md w-40 h-40 flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer hover:shadow-blue-300 transition">
      {name}
    </div>
  );
};

export default NewsSourceButton;
