import "bulma/css/bulma.min.css";
import "./App.css";
import React, { useState } from "react";

import { ProductForm } from "./components/ProductForm";
import ProductsAdded from "./components/ProductsAdded";

function App() {
  const [products, setProducts] = useState([]);
  const addProductHandler = (newProduct) => {
    let newProducts = [...products, newProduct];
    setProducts(newProduct);
  };
  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12">
          <ProductForm addProductHandler={addProductHandler} />
        </div>
        <div className="column is-12">
          <ProductsAdded products={products} />
        </div>
      </div>
    </div>
  );
}

export default App;
