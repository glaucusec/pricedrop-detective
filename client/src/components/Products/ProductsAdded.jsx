import React, { useState, Fragment } from "react";

import { toggleTrackingRequest, deleteProductRequest } from "./ProductHelpers";

import Product from "./Product";

export default function ProductsAdded({ products, setProductsHandler }) {
  async function toggleTrackingHandler(prodId) {
    let status;
    let newProducts = products.map((product) => {
      if (product.id == prodId) {
        status = !product.trackingStatus;
        return { ...product, trackingStatus: !product.trackingStatus };
      } else {
        return product;
      }
    });
    // update the products - [state] only if toggleTrackingRequest is successful.
    const toggleTrackingRequestOK = await toggleTrackingRequest(prodId, status);
    if (toggleTrackingRequestOK) {
      setProductsHandler(newProducts);
    }
  }

  async function deleteProductHandler(prodId) {
    const productDeleted = await deleteProductRequest(prodId);
    if (productDeleted) {
      let newProducts = products.filter((product) => {
        if (product.id !== prodId) {
          return product;
        }
      });
      setProductsHandler(newProducts);
    }
  }
  return (
    <Fragment>
      {products.length != 0 ? (
        <Fragment>
          <h2 className="has-text-centered title is-5">Products Added</h2>
          <div className="columns is-multiline is-1">
            {products.map((product) => {
              return (
                <Product
                  product={product}
                  toggleTrackingHandler={toggleTrackingHandler}
                  deleteProductHandler={deleteProductHandler}
                />
              );
            })}
          </div>
        </Fragment>
      ) : (
        <h2 className="title is-5">You have no products Added.</h2>
      )}
    </Fragment>
  );
}
