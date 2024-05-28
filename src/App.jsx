import React, { useEffect, useState } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { database } from "./firebase/firebase";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
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
      }, 3000);
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
      <Navbar />
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
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
