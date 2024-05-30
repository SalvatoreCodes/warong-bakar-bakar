import React, { useContext, useEffect, useState } from "react";
import Back from "../components/Back";
import { getCurrentUser, logout } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { auth } from "../firebase/firebase";

function User() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "Anonymous");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="user">
      <Back />
      <h1>Hi {displayName}</h1>
      <button className="logout--button" onClick={logoutHandler}>
        Log Out
      </button>
    </div>
  );
}

export default User;
