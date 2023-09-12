import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

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
      <div className="container">
        {product ? (
          <div className="columns">
            <article class="media">
              <figure class="media-left">
                <p class="image is-256x256">
                  <img src={product.imageURL} />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{product.title}</strong>
                    <small>31m</small>
                    <br />
                    <Rating rating={product.rating} />
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <Link className="level-item" to={`/products/${product.id}`}>
                      <button className="button is-info ">View Details</button>
                    </Link>
                    <button className="button level-item">Delete</button>
                  </div>
                  <div class="level-right">
                    <button className="button level-item">Delete</button>
                  </div>
                </nav>
              </div>
              <div class="media-right">
                <button class="delete"></button>
              </div>
            </article>
          </div>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </React.Fragment>
  );
}
