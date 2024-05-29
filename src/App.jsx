// App.jsx
import React, { useEffect, useState, useContext } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "./firebase/firebase";
import { CartContext } from "./components/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

import { getCurrentUser } from "./firebase/firebase";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart, setCart, addToCart } = useContext(CartContext);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const fetchData = () => {
      const itemsRef = dbRef(database, "items");
      onValue(
        itemsRef,
        (snapshot) => {
          const data = snapshot.val();
          const items = data ? Object.values(data) : [];
          setData(items);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      );
    };

    fetchData();
  }, []);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Navbar user={user} />
      <Hero />
      <div className="menu--list">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="card--container--search"
        />
        <div className="card--container">
          {filteredData.map((item) => (
            <Card
              key={item.id}
              src={item.imageUrl}
              alt={item.name}
              name={item.name}
              price={item.price}
              addToCart={() => addToCart(item)}
              ifCart={false}
              ifAmount={false}
              ifCardHover={true}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
