import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import Card from "../components/Card"; // Assuming Card component is in the same directory
import Back from "../components/Back";
import { getCurrentUser, getCartData } from "../firebase/firebase";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = getCurrentUser();
        if (userId) {
          const userCartData = await getCartData(userId);
          setCart(userCartData);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart]);

  if (loading) {
    return <p>Loading...</p>;
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
                  ifCart={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
