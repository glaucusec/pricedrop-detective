import React from "react";

export default function ProductInfoImage({imageURL}) {
  return (
    <figure className="media-left">
      <p className="image is-256x256">
        <img src={imageURL} />
      </p>
    </figure>
  );
}
