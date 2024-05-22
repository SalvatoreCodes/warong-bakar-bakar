import React from "react";

function Card(props) {
  return (
    <div className="card" key={props.key}>
      <div className="card--image">
        <img src={props.src} alt={props.alt} />
      </div>
      <div className="card--information">
        <h3>{props.name}</h3>
        <p>Rp.{props.price}</p>
      </div>
    </div>
  );
}

export default Card;
