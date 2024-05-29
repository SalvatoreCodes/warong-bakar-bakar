import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

function Card({
  src,
  alt,
  name,
  price,
  quantity, // Add quantity as a prop
  addToCart,
  removeFromCart,
  ifAmount,
  ifCart,
  ifCardHover,
}) {
  const { cart, setCart } = useContext(CartContext);

  const amountHandler = (action) => {
    if (action === "-" && quantity === 1) {
      removeFromCart(name); // Call removeFromCart function with item name
    } else {
      const updatedCart = cart.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + (action === "+" ? 1 : -1) }
          : item
      );
      setCart(updatedCart);
    }
  };

  const [displayCart, setDisplayCart] = useState(ifCart);
  const [displayAmount, setDisplayAmount] = useState(ifAmount);
  const [cardHover, setCardHover] = useState(ifCardHover);

  useEffect(() => {
    setDisplayCart(ifCart);
    setDisplayAmount(ifAmount);
    setCardHover(ifCardHover);
  }, [ifCart, ifAmount, ifCardHover]);

  return (
    <div className={`card ${cardHover && "card--hover"}`} onClick={addToCart}>
      <div className="card--image">
        <img src={src} alt={alt} />
      </div>
      <div className="card--information">
        <div className="card--information--description">
          <h3>{name}</h3>
          <p>Rp.{price}</p>
        </div>
        <div className="card--information--amount">
          {displayCart && (
            <div className="amount">
              <button onClick={() => amountHandler("-")} className="decrement">
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => amountHandler("+")} className="increment">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
