import React from "react";
import hero from "../assets/images/hero.png";

function Hero() {
  return (
    <div className="hero">
      <h1>Warong Bakar Bakar</h1>
      <h2>"Tomohon kwa dingin jadi susah ba diet."</h2>
      <img src={hero} alt="hero image" />
    </div>
  );
}

export default Hero;
