"use client";

import React, { useContext, useState } from "react";
import { ButtonContext } from "../compare/context/ButtonContext";
import TitleButton from "./TitleButton";
import { useArticles } from "../hooks/useArticles";

function TitleContainer() {
  const { buttons } = useContext(ButtonContext);
  const { news1, news2, loading, error } = useArticles(buttons);

  const [visibleCount1, setVisibleCount1] = useState(5);
  const [visibleCount2, setVisibleCount2] = useState(5);
  const loadMore1 = () => setVisibleCount1((prev) => prev + 5);
  const loadMore2 = () => setVisibleCount2((prev) => prev + 5);

  const [source1, source2] = buttons;

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto px-4">
      {/* Left Column */}
      <div className="flex flex-col">
        <h2 className="text-center text-xl sm:text-2xl font-semibold font-montserrat text-gray-800 mb-4">
          {source1 ? source1.toUpperCase() : ""}
        </h2>
        {source1 ? (
          <>
            <div className="flex flex-col gap-3">
              {news1.slice(0, visibleCount1).map((item, index) => (
                <TitleButton
                  title={item.articleName}
                  key={index}
                  source={source1}
                />
              ))}
            </div>
            {news1.length > visibleCount1 && (
              <button
                onClick={loadMore1}
                className="mt-4 self-center bg-black text-white font-medium font-montserrat px-5 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Add More
              </button>
            )}
          </>
        ) : (
          <div className="bg-gray-100 text-gray-500 font-montserrat text-center rounded-xl p-6">
            Select a source to display article titles here.
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="flex flex-col">
        <h2 className="text-center text-xl sm:text-2xl font-semibold font-montserrat text-gray-800 mb-4">
          {source2 ? source2.toUpperCase() : ""}
        </h2>
        {source2 ? (
          <>
            <div className="flex flex-col gap-3">
              {news2.slice(0, visibleCount2).map((item, index) => (
                <TitleButton
                  title={item.articleName}
                  key={index}
                  source={source2}
                />
              ))}
            </div>
            {news2.length > visibleCount2 && (
              <button
                onClick={loadMore2}
                className="mt-4 self-center bg-black text-white font-medium font-montserrat px-5 py-2 rounded-md hover:bg-gray-900 transition"
              >
                Add More
              </button>
            )}
          </>
        ) : (
          <div className="bg-gray-100 text-gray-500 font-montserrat text-center rounded-xl p-6">
            Select a second source to begin comparison.
          </div>
        )}
      </div>

      {/* Status messages */}
      {loading && (
        <p className="col-span-2 text-center text-sm text-gray-500 mt-6">Loading articles...</p>
      )}
      {error && (
        <p className="col-span-2 text-center text-sm text-red-500 mt-2">Error: {error}</p>
      )}
    </div>
  );
}

export default TitleContainer;