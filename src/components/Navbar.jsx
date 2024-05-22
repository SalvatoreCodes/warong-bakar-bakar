import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo wbb.jfif";

function Navbar() {
  return (
    <div className="navbar">
      <Link to={"login"}>
        <h1>Login</h1>
      </Link>
      <img src={Logo} alt="logo wbb" className="navbar--logo--wbb" />
      <Link to={"cart"}>
        <h1>Cart</h1>
      </Link>
    </div>
  );
}

export default Navbar;
