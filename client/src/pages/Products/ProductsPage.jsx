import React, { useContext } from "react";
import { ProductForm } from "../../components/Products/ProductForm";
import ProductsAdded from "../../components/Products/ProductsAdded";

import { ProductsContext } from "../../context/Products";

export default function ProductsList() {
  const productCtx = useContext(ProductsContext);
  const products = productCtx.products;
  const setProductsHandler = productCtx.setProductsHandler;
  const addProductHandler = productCtx.addProductHandler;

  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12">
          <ProductForm addProductHandler={addProductHandler} />
        </div>
        <div className="column is-12">
          <ProductsAdded
            products={products}
            setProductsHandler={setProductsHandler}
          />
        </div>
      </div>
    </div>
  );
}