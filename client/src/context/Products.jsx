import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext({});

export default function ProductsProvider(props) {
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
        const response = await axios.get(
          "http://localhost:3000/api/user/products",
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products data:", error);
      }
    };
    fetchData();
  }, []);

  const productCtx = {
    products: products,
    addProductHandler: addProductHandler,
    setProductsHandler: setProductsHandler,
  };
  return (
    <ProductsContext.Provider value={productCtx}>
      {props.children}
    </ProductsContext.Provider>
  );
}
