import './App.css';
import React from "react";
import ProductNameGenerator from "./components/ProductNameGenerator";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}>
      <ProductNameGenerator />
    </div>
  );
}

export default App;
