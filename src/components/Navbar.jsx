import React from "react";
import Logo from "../assets/images/logo wbb.jfif";

function Navbar() {
  return (
    <div className="navbar">
      <h1>Login</h1>
      <img src={Logo} alt="logo wbb" className="navbar--logo--wbb" />
      <h1>Cart</h1>
    </div>
  );
}

export default Navbar;
