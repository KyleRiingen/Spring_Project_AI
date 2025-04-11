"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";


// Define the structure of the button context
interface ButtonContextType {
  buttons: string[];
  canSelectMore: () => boolean; 
  addButton: (item: string) => void;
  removeButton: (buttonName: string) => void;
}

// Create the buttoncontext with a default value
export const ButtonContext = createContext<ButtonContextType>({
  buttons: [],
  canSelectMore: () => true, 
  addButton: () => {},
  removeButton: () => {},
});

// Define the props for the provider component
interface ButtonProviderProps {
  children: ReactNode;
}

const ButtonProvider: React.FC<ButtonProviderProps> = ({ children }) => {
    // Array of buttonTypes 
  const [buttons, setButtons] = useState<string[]>([]);

  // Clears local storage on reload
  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("buttons");
    };
  
    window.addEventListener("beforeunload", clearLocalStorage);
    
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  // Update localStorage whenever buttons changes
  useEffect(() => {
    if (buttons.length > 0) {
      localStorage.setItem("buttons", JSON.stringify(buttons));
    }
  }, [buttons]);

  // Add item to buttons
  const addButton = (item: string) => {
    if (buttons.length < 2 && !buttons.includes(item)) {
        setButtons([...buttons, item]);
      }
  };

  // Remove item from buttons
  const removeButton = (buttonName: string) => {
    setButtons((prevItems) => {
      const updateButtons = prevItems.filter((item) => item !== buttonName);
      localStorage.setItem("buttons", JSON.stringify(updateButtons));
      return updateButtons;
    });
  };

  const canSelectMore = (): boolean => {
    if (buttons.length < 2) { 
      return true
    } else { 
      return false
    }
  }


  const contextValue: ButtonContextType = {
    buttons: buttons,
    canSelectMore,
    addButton,
    removeButton
  };

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonProvider;