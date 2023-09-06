import "bulma/css/bulma.min.css";
import "bulma-switch";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { ProductForm } from "./components/ProductForm";
import ProductsAdded from "./components/ProductsAdded";

function App() {
  const [products, setProducts] = useState([]);

  function setProductsHandler(newProducts) {
    setProducts(newProducts);
  }

  const addProductHandler = (newProduct) => {
    let newProducts = [newProduct, ...products];
    setProducts(newProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12">
          <ProductForm addProductHandler={addProductHandler} />
        </div>
        <div className="column is-12">
          <ProductsAdded products={products} setProductsHandler={setProductsHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
