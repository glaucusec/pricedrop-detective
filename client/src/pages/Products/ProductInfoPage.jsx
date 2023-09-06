import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductInfoPage() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  async function fetchProductDetails() {
    const response = await axios.post(
      `http://localhost:3000/api/user/product/`,
      {
        id: productId,
      }
    );
    console.log(response);
  }
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <div className="container">
      <h2>helo</h2>
    </div>
  );
}
