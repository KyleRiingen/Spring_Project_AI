"use client";

import React, { useState, useContext } from "react";
import { ButtonContext } from "../compare/context/ButtonContext";

function NewsSourceButton({ name }: { name: string }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const { buttons, addButton, removeButton, canSelectMore } = useContext(ButtonContext);
  const isSelected = buttons.includes(name);

  return (
    <div
      className={`w-40 h-40 flex items-center justify-center text-lg font-semibold rounded-2xl cursor-pointer border transition-all duration-200
        ${
          isSelected
            ? "bg-blue-600 text-white border-blue-600 shadow-lg"
            : "bg-white text-gray-800 border-gray-300 hover:border-gray-500 hover:shadow-md"
        }`}
      onClick={() => {
        if (isSelected) {
          removeButton(name);
          setButtonClicked(false);
        } else if (canSelectMore()) {
          addButton(name);
          setButtonClicked(true);
        }
      }}
    >
      {name}
    </div>
  );
}

export default NewsSourceButton;