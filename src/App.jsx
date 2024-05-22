import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="card--container">
        <Card />
      </div>
    </div>
  );
}

export default App;
