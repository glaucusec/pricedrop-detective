import React from "react";
import { Link } from "react-router-dom";

import "./Product.css";

export default function Product({
  product,
  toggleTrackingHandler,
  deleteProductHandler,
}) {
  return (
    <div className="column m-1 customColumn">
      <article class="media" key={product.id}>
        <figure class="media-left">
          <p class="image is-128x128">
            <img src={product.imageURL} />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{product.title}</strong> <small>@johnsmith</small>{" "}
              <small>31m</small>
              <br />
              {product.title}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <button
                onClick={() => deleteProductHandler(product.id)}
                className="button is-danger level-item is-small"
              >
                Delete
              </button>
              <Link to={`/products/${product.id}`}>
                <button className="button is-info is-small level-item">
                  View Details
                </button>
              </Link>
            </div>
            <div class="level-right">
              <div className="field level-item">
                <input
                  onClick={() => toggleTrackingHandler(product.id)}
                  id={`switchRoundedInfo_${product.id}`}
                  type="checkbox"
                  name={`switchRoundedInfo`}
                  className="switch is-rounded is-info"
                  checked={product.trackingStatus ? "checked" : ""}
                />
                <label htmlFor={`switchRoundedInfo_${product.id}`}></label>
              </div>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
    </div>
    // <tr key={product.id}>
    //   <td>
    //     <figure class="image is-128x128">
    //       <img src={product.imageURL} />
    //     </figure>
    //   </td>
    //   <td>{product.title}</td>
    //   <td>
    //     <button
    //       onClick={() => deleteProductHandler(product.id)}
    //       className="button is-danger"
    //     >
    //       Delete
    //     </button>
    //   </td>
    //   <td>
    //     <div className="field">
    //       <input
    //         onClick={() => toggleTrackingHandler(product.id)}
    //         id={`switchRoundedInfo_${product.id}`}
    //         type="checkbox"
    //         name={`switchRoundedInfo`}
    //         className="switch is-rounded is-info"
    //         checked={product.trackingStatus ? "checked" : ""}
    //       />
    //       <label htmlFor={`switchRoundedInfo_${product.id}`}></label>
    //     </div>
    //   </td>
    //   <td>
    //     <Link to={`/products/${product.id}`}>
    //       <button className="button is-info">View Details</button>
    //     </Link>
    //   </td>
    // </tr>
  );
}
