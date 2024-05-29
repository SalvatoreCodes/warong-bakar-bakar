import React, { createContext, useState, useEffect } from "react";
import { saveCartData, getCurrentUser } from "../firebase/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const userId = getCurrentUser();
    if (userId) {
      saveCartData(userId, cart);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
