import React, { useState, Fragment } from "react";
import axios from "axios";

async function toggleTrackingRequest(productId, status) {
  try {
    const response = await axios.post(
      "http://localhost:3000/toggle-tracking",
      {
        id: productId,
        trackingStatus: status,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(response);
  } catch (error) {
    console.log("Error toggling Traking Request", error);
    return false;
  }
}

export default function ProductsTracked({ products, setProductsHandler }) {
  function toggleTrackingHandler(prodId) {
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
    const toggleTrackingRequestOK = toggleTrackingRequest(prodId, status);
    if (toggleTrackingRequestOK) {
      setProductsHandler(newProducts);
    }
  }
  return (
    <Fragment>
      {products.length != 0 ? (
        <Fragment>
          <h2 className="has-text-centered title is-5">Products Added</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Remove Product</th>
                <th>Toggle Tracking</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const productId = product.id;

                return (
                  <tr key={productId}>
                    <td>
                      <figure class="image is-128x128">
                        <img src={product.imageURL} />
                      </figure>
                    </td>
                    <td>{product.title}</td>
                    <td>
                      <button className="button is-danger">Delete</button>
                    </td>
                    <td>
                      <div className="field">
                        <input
                          onClick={() => toggleTrackingHandler(productId)}
                          id={`switchRoundedInfo_${productId}`}
                          type="checkbox"
                          name={`switchRoundedInfo`}
                          className="switch is-rounded is-info"
                          checked={product.trackingStatus ? "checked" : ""}
                        />
                        <label
                          htmlFor={`switchRoundedInfo_${productId}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <button className="button is-info">View Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <h2 className="title is-5">You have no products Added.</h2>
      )}
    </Fragment>
  );
}
