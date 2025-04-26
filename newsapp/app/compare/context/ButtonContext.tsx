"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface TitleButton {
  source: string;
  title: string;
}

interface ButtonContextType {
  buttons: string[];
  canSelectMore: () => boolean;
  addButton: (item: string) => void;
  removeButton: (buttonName: string) => void;

  // New for title buttons with source and title
  titleButtons: TitleButton[];
  addTitleButton: (source: string, title: string) => void;
  removeTitleButton: (source: string, title: string) => void;
  clearTitleButtons: () => void;
}

export const ButtonContext = createContext<ButtonContextType>({
  buttons: [],
  canSelectMore: () => true,
  addButton: () => {},
  removeButton: () => {},

  titleButtons: [],
  addTitleButton: () => {},
  removeTitleButton: () => {},
  clearTitleButtons: () => {},
});

interface ButtonProviderProps {
  children: ReactNode;
}

const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
  const [buttons, setButtons] = useState<string[]>([]);
  const [titleButtons, setTitleButtons] = useState<TitleButton[]>([]);

  // Clear localStorage on reload
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("buttons");
      localStorage.removeItem("titleButtons");
    };
    window.addEventListener("beforeunload", clearLocalStorage);
    return () => window.removeEventListener("beforeunload", clearLocalStorage);
  }, []);

  // Load buttons from localStorage on mount
  useEffect(() => {
    const savedButtons = localStorage.getItem("buttons");
    if (savedButtons) {
      setButtons(JSON.parse(savedButtons));
    }

    const savedTitleButtons = localStorage.getItem("titleButtons");
    if (savedTitleButtons) {
      setTitleButtons(JSON.parse(savedTitleButtons));
    }
  }, []);

  // Save buttons to localStorage
  useEffect(() => {
    if (buttons.length > 0) {
      localStorage.setItem("buttons", JSON.stringify(buttons));
    }
  }, [buttons]);

  // Save titleButtons to localStorage
  useEffect(() => {
    if (titleButtons.length > 0) {
      localStorage.setItem("titleButtons", JSON.stringify(titleButtons));
    }
  }, [titleButtons]);

  const addButton = (item: string) => {
    if (buttons.length < 2 && !buttons.includes(item)) {
      setButtons([...buttons, item]);
    }
  };

  const removeButton = (buttonName: string) => {
    setButtons(prevItems => {
      const updated = prevItems.filter(item => item !== buttonName);
      localStorage.setItem("buttons", JSON.stringify(updated));
      return updated;
    });
  };

  const canSelectMore = () => buttons.length < 2;

  // --- Title Button Methods ---
  const addTitleButton = (source: string, title: string) => {
      setTitleButtons(prev => [...prev, { source, title }]);
  };

  const removeTitleButton = (source: string, title: string) => {
    const updatedTitleButtons = titleButtons.filter(t => !(t.title === title && t.source === source));
    
    // Update the state and sync with localStorage
    setTitleButtons(updatedTitleButtons);
  
    // Save the updated titleButtons to localStorage
    localStorage.setItem("titleButtons", JSON.stringify(updatedTitleButtons));
  };

  const clearTitleButtons = () => {
    setTitleButtons([]);
  };

  const contextValue: ButtonContextType = {
    buttons,
    canSelectMore,
    addButton,
    removeButton,
    titleButtons,
    addTitleButton,
    removeTitleButton,
    clearTitleButtons,
  };

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonProvider;