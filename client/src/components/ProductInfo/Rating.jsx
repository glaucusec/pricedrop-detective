import React from "react";
import "./Rating.css";
export default function Rating({ rating }) {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <span
        key={index}
        className={`fa fa-star ${index < rating ? "checked" : ""}`}
      ></span>
    ));

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      {stars}
      <br />
      <span className="">{rating}</span>
    </>
  );
}
