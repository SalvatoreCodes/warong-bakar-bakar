import React from "react";
import placeholderPicture from "../assets/images/rahang tuna.jpg";

function Card() {
  return (
    <div className="card">
      <div className="card--image">
        <img src={placeholderPicture} alt="placeholder picture" />
      </div>
      <div className="card--information">
        <h3>Rahang Tuna Medium</h3>
        <p>Rp.51,000</p>
      </div>
    </div>
  );
}

export default Card;
