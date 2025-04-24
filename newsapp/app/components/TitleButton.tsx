import React, { useContext, useState } from "react";
import { ButtonContext } from "../compare/context/ButtonContext";

interface TitleButtonProps {
  title: string;
  source: string;
}

function TitleButton({ title, source }: TitleButtonProps) {
  const { titleButtons, addTitleButton, removeTitleButton } = useContext(ButtonContext);
  // Check if the button is already selected (i.e., present in titleButtons)
  const isSelected = titleButtons.some((btn) => btn.source === source && btn.title === title);

  const handleClick = () => {
    // If already selected, remove it; otherwise, add it
    if (isSelected) {
      removeTitleButton(source, title); // Call context to remove the title button
    } else {
      // Ensure that only one button per source can be added
      if (titleButtons.some((btn) => btn.source === source)) {
        return;
      }
      addTitleButton(source, title); // Add button to context
    }
  };

  return (
    <button
      className={`bg-white p-2 m-2 border-1 font-montserrat font-bold flex items-center justify-center ${
        isSelected ? "border-2 border-blue-500" : ""
      }`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default TitleButton;