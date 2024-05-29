import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo wbb.jfif";

import { getAuth } from "firebase/auth";

function Navbar({ user }) {
  return (
    <div className="navbar">
      {user ? (
        <Link to="/user">
          <h1>User</h1>
        </Link>
      ) : (
        <Link to={"login"}>
          <h1>Login</h1>
        </Link>
      )}
      <img src={Logo} alt="logo wbb" className="navbar--logo--wbb" />
      <Link to={"cart"}>
        <h1>Cart</h1>
      </Link>
    </div>
  );
}

export default Navbar;
