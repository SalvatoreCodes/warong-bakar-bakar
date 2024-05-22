import React from "react";
import Logo from "../assets/images/logo wbb.jfif";

function Loading() {
  return (
    <div className="loading">
      <img src={Logo} alt="logo wbb" />
      <div class="loader"></div>
    </div>
  );
}

export default Loading;
