import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import Card from "../components/Card";
import Back from "../components/Back";
import { getCurrentUser, getCartData } from "../firebase/firebase";
import Loading from "../components/Loading";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = getCurrentUser();
        if (userId) {
          setUser(userId);
          const userCartData = await getCartData(userId);
          const consolidatedCart = consolidateCartItems(userCartData);
          setCart(consolidatedCart || []);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [setCart]);

  const consolidateCartItems = (items) => {
    const itemMap = {};

    items.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].quantity += item.quantity || 1;
      } else {
        itemMap[item.id] = {
          ...item,
          quantity: item.quantity || 1,
        };
      }
    });

    return Object.values(itemMap);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleIncrement = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    const message = cart
      .map(
        (item) =>
          `Item: ${item.name}\nQuantity: ${item.quantity}\nPrice: ${item.price}\n`
      )
      .join("\n");

    const whatsappNumber = "0882019028284"; // Replace with your phone number in international format, e.g., "1234567890"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="cart--container">
        <div className="cart">
          <Back />
          <div className="cart--content">
            <h1>Cart</h1>
            <p>You need to log in to view your cart.</p>
          </div>
        </div>
      </div>
    );
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
                  removeFromCart={() => removeFromCart(item.id)}
                  handleIncrement={() => handleIncrement(item.id)}
                  handleDecrement={() => handleDecrement(item.id)}
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
