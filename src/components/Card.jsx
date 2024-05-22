import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="card--image">
        <img src={props} alt="placeholder picture" />
      </div>
      <div className="card--information">
        <h3>Rahang Tuna Medium</h3>
        <p>Rp.51,000</p>
      </div>
    </div>
  );
}

export default Card;
