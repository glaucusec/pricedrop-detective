import { useRef, useState } from "react";
import axios from "axios";
import { URLPrettier, isValidURL } from "../../utils/functions";

export const ProductForm = ({
  addProductHandler,
  showAddProductFormHandler,
}) => {
  const [loading, setIsLoading] = useState(false);
  const productRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let productUrl = URLPrettier(productRef.current.value);
    if (!productUrl || !isValidURL(productUrl)) {
      alert("Enter a valid URL");
      productRef.current.value = "";
      setIsLoading(false);
      return;
    }

    productRef.current.value = "";
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/products",
        {
          url: productUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      addProductHandler(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error posting Product Data:", error);
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className="field">
        <input
          type="text"
          className="input"
          placeholder="Enter Product URL"
          ref={productRef}
        />
      </div>

      <div class="field is-grouped">
        <div className="control">
          <button
            className={`button is-small is-link ${
              loading ? "is-loading" : " "
            }`}
          >
            Add
          </button>
        </div>
        <div class="control">
          <button
            onClick={showAddProductFormHandler}
            class="button is-small is-link is-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
