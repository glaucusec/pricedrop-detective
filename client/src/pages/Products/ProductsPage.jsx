import React, { useContext, useState } from "react";

import { ProductForm } from "../../components/Products/ProductForm";
import ProductsAdded from "../../components/Products/ProductsAdded";

import { ProductsContext } from "../../context/Products";

import Header from "../../components/Header/Header";

export default function ProductsList() {
  const productCtx = useContext(ProductsContext);
  const products = productCtx.products;
  const setProductsHandler = productCtx.setProductsHandler;
  const addProductHandler = productCtx.addProductHandler;

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  function showAddProductFormHandler() {
    setShowAddProductForm((prevstate) => !prevstate);
  }
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="columns is-multiline">
          <div class="column is-12 is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
            {!showAddProductForm && (
              <div class="has-text-centered">
                <button
                  onClick={showAddProductFormHandler}
                  class="button is-small is-link"
                >
                  Add New Product
                </button>
              </div>
            )}
            {showAddProductForm && (
              <ProductForm
                addProductHandler={addProductHandler}
                showAddProductFormHandler={showAddProductFormHandler}
              />
            )}
          </div>

          <div className="column is-12">
            <ProductsAdded
              products={products}
              setProductsHandler={setProductsHandler}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
