import React, { createContext, useState, useEffect } from "react";
import {
  saveCartData,
  getCartData,
  getCurrentUser,
} from "../firebase/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      const userId = getCurrentUser();
      if (userId) {
        saveCartData(userId, updatedCart);
      }
      return updatedCart;
    });
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const userId = getCurrentUser();
      if (userId) {
        const userCartData = await getCartData(userId);
        setCart(userCartData || []);
      }
    };
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
