import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserAuth";

export const ProductsContext = createContext({});

export default function ProductsProvider(props) {
  const authCtx = useContext(UserContext);

  const [products, setProducts] = useState([]);

  function setProductsHandler(newProducts) {
    setProducts(newProducts);
  }

  const addProductHandler = (newProduct) => {
    let newProducts = [newProduct, ...products];
    setProducts(newProducts);
  };

  function sessionInvalidHandler() {
    authCtx.setInvalidUserHandler();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/products",
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        if (
          error.response.status == 401 &&
          error.response.data.state == "ExpiredToken"
        ) {
          sessionInvalidHandler();
        }
        console.log("Error fetching products data:", error);
      }
    };
    fetchData();
  }, [authCtx.user]);

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
