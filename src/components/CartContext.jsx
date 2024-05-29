import React, { createContext, useState, useEffect } from "react";
import { saveCartData, getCurrentUser } from "../firebase/firebase";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
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

  // Function to remove items from the cart (optional)
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
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
        setCart(userCartData);
      }
    };
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
