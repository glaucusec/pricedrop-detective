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

router.post(
  "/toggle-tracking",
  authMiddleWare.authenticateToken,
  productController.toggleTracking
);

router.delete(
  "/products/:id",
  authMiddleWare.authenticateToken,
  productController.deleteProduct
);

router.post(
  "/product-basic",
  authMiddleWare.authenticateToken,
  productController.productDetails
);

router.post(
  "/product-detailed",
  authMiddleWare.authenticateToken,
  productController.productDetailedInfo
);

module.exports = router;
