import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

// components
import Rating from "../../components/ProductInfo/Rating";
import ProductInfoImage from "../../components/ProductInfo/ProductInfoImage";
import Header from "../../components/Header/Header";

export default function ProductInfoPage() {
  const [product, setProduct] = useState({});
  const [productDetailed, setProductDetailed] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProductBasic() {
      const response = await axios.post(
        `http://localhost:3000/api/user/product-basic/`,
        {
          id: productId,
        },
        { withCredentials: true }
      );

      setProduct({
        ...response.data,
        rating: parseFloat(response.data.rating),
      });
    }
    fetchProductBasic();
  }, []);

  useEffect(() => {
    async function fetchDetailedInfo() {
      const response = await axios.post(
        "http://localhost:3000/api/user/product-detailed",
        {
          id: productId,
        },
        { withCredentials: true }
      );

      setProductDetailed(response.data);
    }
    fetchDetailedInfo();
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {product ? (
          <div className="columns">
            <article className="media">
              <ProductInfoImage imageURL={product.imageURL} />
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{product.title}</strong>
                    <small>31m</small>
                    <br />
                    <Rating rating={product.rating} />
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a href={product.url} target="_blank">
                      <button className="button is-info ">
                        View Product on Amazon
                      </button>
                    </a>
                  </div>
                  <div className="level-right">
                    <button className="button is-danger level-item">
                      Delete
                    </button>
                  </div>
                </nav>
                <ol>
                  {productDetailed.length > 0 ? (
                    productDetailed.map((detail) => {
                      for (const key in detail) {
                        return (
                          <tr>
                            <td style={{ fontWeight: "bold" }}>{key} :</td>
                            <td>{detail[key]}</td>
                          </tr>
                        );
                      }
                    })
                  ) : (
                    <p>Loading...</p>
                  )}
                </ol>
              </div>
              <div className="media-right">
                <button className="delete"></button>
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
