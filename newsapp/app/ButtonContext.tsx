"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";


// Define the structure of the cart context
interface ButtonContextType {
  buttons: string[];
  addButton: (item: string) => void;
  removeButton: (buttonName: string) => void;
}

// Create the CartContext with a default value
export const ButtonContext = createContext<ButtonContextType>({
  buttons: [],
  addButton: () => {},
  removeButton: () => {},
});

// Define the props for the provider component
interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Array of buttonTypes 
  const [buttons, setButtons] = useState<string[]>([]);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("buttons");
    if (savedCart) {
      setButtons(JSON.parse(savedCart) as string[]);
    }
  }, []);

  // Update localStorage whenever cartItems changes
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


  const contextValue: ButtonContextType = {
    buttons: buttons,
    addButton,
    removeButton
  };

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
};

export default CartProvider;