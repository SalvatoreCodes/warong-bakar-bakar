import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard.jsx";
import Cart from "./routes/Cart.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import ErrorPopup from "./components/ErrorPopup.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import User from "./routes/User.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/error--popup",
    element: <ErrorPopup />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
