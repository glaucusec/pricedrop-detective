import axios from "axios";
async function toggleTrackingRequest(productId, status) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/toggle-tracking",
      {
        id: productId,
        trackingStatus: status,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return true;
  } catch (error) {
    console.log("Error toggling Tracking Request", error);
    return false;
  }
}

async function deleteProductRequest(productId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/products/${productId}`
    );
    return response.status == 204 && response.statusText == "No Content"
      ? true
      : false;
  } catch (error) {
    return false;
  }
}

export { toggleTrackingRequest, deleteProductRequest };
