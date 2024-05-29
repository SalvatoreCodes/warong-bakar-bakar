import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

function Card({ src, alt, name, price, addToCart, ifAmount, ifCart }) {
  const handleClick = () => {
    addToCart();
  };

  const { cart, setCart } = useContext(CartContext);

  const { amount, setAmount } = useState(0);

  const [displayCart, setDisplayCart] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(false);

  useEffect(() => {
    setDisplayCart(ifCart);
    setDisplayAmount(ifAmount);
  }, [displayCart, displayAmount]);

  const removeFromCart = () => {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card--image">
        <img src={src} alt={alt} />
      </div>
      <div className="card--information">
        <div className="card--information--description">
          <h3>{name}</h3>
          <p>Rp.{price}</p>
          {displayAmount && <p>x {amount}</p>}
        </div>
        <div className="card--information--button">
          {displayCart && (
            <button
              className="card--information--remove"
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
