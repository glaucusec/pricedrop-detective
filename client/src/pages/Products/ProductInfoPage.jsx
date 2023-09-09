import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// components
import Rating from "../../components/ProductInfo/Rating";
import Header from "../../components/Header/Header";

export default function ProductInfoPage() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProductDetails() {
      const response = await axios.post(
        `http://localhost:3000/api/user/product/`,
        {
          id: productId,
        }
      );

      setProduct({
        ...response.data,
        rating: parseFloat(response.data.rating),
      });
    }
    fetchProductDetails();
  }, []);
  return (
    <React.Fragment>
      <Header />
      {product ? (
        <div className="columns is-multiline">
          <div className="column is-half">
            <figure class="image is-128x128">
              <img src={product.imageURL} />
            </figure>
          </div>
          <div className="column is-half">
            <h1 className="title">{product.title}</h1>
            <Rating rating={product.rating} />
          </div>
          <div className="column"></div>
        </div>
      ) : (
        <div> Loading... </div>
      )}
    </React.Fragment>
  );
}
