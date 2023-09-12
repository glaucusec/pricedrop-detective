const express = require("express");

const router = express.Router();

const productController = require("../../controllers/user/productController");
// middleware
const authMiddleWare = require("../../middleware/authenticate");

router.get(
  "/products",
  authMiddleWare.authenticateToken,
  productController.getAllProducts
);

router.post(
  "/products",
  authMiddleWare.authenticateToken,
  productController.addNewProduct
);

router.post("/toggle-tracking", productController.toggleTracking);

router.delete("/products/:id", productController.deleteProduct);

router.post("/product", productController.productDetails);

module.exports = router;
