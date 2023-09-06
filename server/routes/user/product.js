const express = require("express");

const router = express.Router();

const productController = require("../../controllers/user/product");

router.get("/products", productController.getAllProducts);

router.post("/products", productController.addNewProduct);

router.post("/toggle-tracking", productController.toggleTracking);

router.delete("/products/:id", productController.deleteProduct);

router.post("/product", productController.productDetails);

module.exports = router;
