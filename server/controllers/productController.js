const path = require("path");
const uuid = require("uuid");

const Product = require("../models/Product");
const { isValidURL, generateUniqueId } = require("../util/helpers");
const { findProductData } = require("../util/scrapers");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ["id", "title", "price", "url", "imageURL", "trackingStatus"],
  });
  res.status(200).json(products);
};

exports.addNewProduct = async (req, res, next) => {
  const url = req.body.url;
  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid URL Address" });
  }
  try {
    const { title, price, imageURL } = await findProductData(url);
    const product = await Product.create({
      id: uuid.v4(),
      title: title,
      price: price,
      url: url,
      imageURL: imageURL,
      trackingStatus: false,
    });
    const returnData = {
      id: product.id,
      title: product.title,
      price: product.price,
      url: product.url,
      imageURL: product.imageURL,
      trackingStatus: product.trackingStatus,
      message: "Valid Product",
    };
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
  }
};

exports.toggleTracking = async (req, res, next) => {
  const id = req.body.id;
  const trackingStatus = req.body.trackingStatus;
  try {
    const record = await Product.findByPk(id);
    if (!record) {
      return res.status(404).json({
        error: "Product not found",
        message: "The product with the specified ID does not exist.",
      });
    }
    record.trackingStatus = trackingStatus;
    await record.save();
    return res
      .status(200)
      .json({ status: `Tracking changed to ${trackingStatus}` });
  } catch (error) {
    return res.status(500).json({
      error: "Checking record failed",
      message: "Querying Database failed! Try again later",
    });
  }
};
