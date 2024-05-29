import React from "react";
import Logo from "../assets/images/logo wbb.jfif";

function Loading() {
  return (
    <div className="loading">
      <div className="loading--content">
        <img src={Logo} alt="logo wbb" />
        <div class="loader"></div>
      </div>
    </div>
  );
}

export default Loading;
