const path = require("path");
const uuid = require("uuid");

const Product = require("../models/Product");
const { isValidURL, generateUniqueId } = require("../util/helpers");
const { findProductData } = require("../util/scrapers");

exports.getAllProducts = (req, res, next) => {};

exports.addNewProduct = async (req, res, next) => {
  const url = req.body.url;
  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid URL Address" });
  }
  const { title, price } = await findProductData(url);
  const product = await Product.create({
    id: uuid.v4(),
    title: title,
    price: price,
    url: url,
  });
  const returnData = {
    id: product.id,
    title: product.title,
    price: product.price,
    url: product.url,
    message: "Valid Product",
  };
  return res.status(200).json(returnData);
};
