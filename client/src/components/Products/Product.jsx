import React from "react";
import { Link } from "react-router-dom";

export default function Product({
  product,
  toggleTrackingHandler,
  deleteProductHandler,
}) {
  return (
    <tr key={product.id}>
      <td>
        <figure class="image is-128x128">
          <img src={product.imageURL} />
        </figure>
      </td>
      <td>{product.title}</td>
      <td>
        <button
          onClick={() => deleteProductHandler(product.id)}
          className="button is-danger"
        >
          Delete
        </button>
      </td>
      <td>
        <div className="field">
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
      </td>
      <td>
        <Link to={`/products/${product.id}`}>
          <button className="button is-info">View Details</button>
        </Link>
      </td>
    </tr>
  );
}
