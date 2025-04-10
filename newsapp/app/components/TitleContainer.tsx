"use client";
import React, { useContext, useState } from 'react';
import { ButtonContext } from '../ButtonContext';
import TitleButton from './TitleButton';
import { useArticles } from '../hooks/useArticles';

function TitleContainer() {
  const { buttons } = useContext(ButtonContext);
  const { news1, news2, loading, error } = useArticles(buttons);

  const [visibleCount1, setVisibleCount1] = useState(5);
  const [visibleCount2, setVisibleCount2] = useState(5);
  const loadMore1 = () => setVisibleCount1((prev) => prev + 5);
  const loadMore2 = () => setVisibleCount2((prev) => prev + 5);

  const [source1, source2] = buttons;

  return (
    <div className="flex flex-row p-2 m-2">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col">
        <div className="font-sigmar flex items-center justify-center text-2xl font-bold">
          <h1>{source1 ? source1.toUpperCase() : "Select an option above"}</h1>
        </div>
        {news1.slice(0, visibleCount1).map((item, index) => (
          <TitleButton title={item.titles} key={index} />
        ))}
        {news1.length > visibleCount1 && (
          <button onClick={loadMore1} className="bg-black font-montserrat text-white p-2 m-2 rounded-md">
            Add More
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col">
        <div className="font-sigmar flex items-center justify-center text-2xl font-bold">
          <h1>{source2 ? source2.toUpperCase() : "Select an option above"}</h1>
        </div>
        {news2.slice(0, visibleCount2).map((item, index) => (
          <TitleButton title={item.titles} key={index} />
        ))}
        {news2.length > visibleCount2 && (
          <button onClick={loadMore2} className="bg-black font-montserrat text-white p-2 m-2 rounded-md">
            Add More
          </button>
        )}
      </div>

      {loading && <p className="absolute bottom-4 left-4 text-gray-600">Loading articles...</p>}
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
}

export default TitleContainer;
