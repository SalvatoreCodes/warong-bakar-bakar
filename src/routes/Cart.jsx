import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import Card from "../components/Card";
import Back from "../components/Back";
import { getCurrentUser, getCartData } from "../firebase/firebase";
import Loading from "../components/Loading";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = getCurrentUser();
        if (userId) {
          const userCartData = await getCartData(userId);
          // Ensure each item in cart data has a valid quantity
          const cartWithQuantity = userCartData.map((item) => ({
            ...item,
            quantity: item.quantity || 1, // Default quantity to 1 if missing or invalid
          }));
          setCart(cartWithQuantity || []);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart]);

  const removeFromCart = (itemName) => {
    const updatedCart = cart.filter((item) => item.name !== itemName);
    setCart(updatedCart);
  };

  const handleIncrement = (itemName) => {
    const updatedCart = cart.map((item) =>
      item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (itemName) => {
    const updatedCart = cart.map((item) =>
      item.name === itemName && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    const itemAmount = cart.map((item) => {
      console.log(item.id);
      console.log(item.name);
      console.log(item.quantity);
      console.log(item.price);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cart--container">
      <div className="cart">
        <Back />
        <div className="cart--content">
          <h1>Cart</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="card--container">
              {cart.map((item, index) => (
                <Card
                  key={index}
                  src={item.imageUrl}
                  alt={item.name}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  addToCart={() => {}}
                  removeFromCart={() => removeFromCart(item.name)}
                  handleIncrement={() => handleIncrement(item.name)}
                  handleDecrement={() => handleDecrement(item.name)}
                  ifCart={true}
                  ifAmount={true}
                  ifCardHover={false}
                />
              ))}
              <button
                className="card--container--checkout"
                onClick={handleCheckout}
              >
                Check Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
