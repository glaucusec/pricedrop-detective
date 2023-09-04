import { useRef, useState } from "react";
import axios from "axios";
export const ProductForm = () => {
  const [loading, setIsLoading] = useState(false);
  const productRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!productRef.current.value) {
      alert("Enter a valid URL");
      return;
    }
    let productUrl = productRef.current.value;
    productRef.current.value = "";
    setIsLoading(true);

    const response = await axios.post(
      "http://localhost:3000/products",
      {
        url: productUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    setIsLoading(false);
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className="field">
        <h2 className="has-text-centered title is-5">Product URL</h2>
        <input
          type="text"
          className="input"
          placeholder="Enter Product URL"
          ref={productRef}
        />
      </div>

      <div className="field">
        <div className="control">
          <button className={`button is-link ${loading ? "is-loading" : " "}`}>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
