const uuid = require("uuid");

const Product = require("../../models/Product");
const { isValidURL, generateUniqueId } = require("../../util/helpers/common");
const { findProductData } = require("../../util/scrapers");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.findAll({
    attributes: ["id", "title", "price", "url", "imageURL", "trackingStatus"],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json(products);
};

exports.addNewProduct = async (req, res, next) => {
  const url = req.body.url;
  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid URL Address" });
  }
  try {
    const { title, price, imageURL, rating } = await findProductData(url);
    const product = await Product.create({
      id: generateUniqueId(),
      title: title,
      price: price,
      url: url,
      imageURL: imageURL,
      rating: rating,
      trackingStatus: false,
    });
    const returnData = {
      id: product.id,
      title: product.title,
      price: product.price,
      url: product.url,
      imageURL: product.imageURL,
      trackingStatus: product.trackingStatus,
      rating: rating,
      message: "Valid Product",
    };
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Checking record failed",
      message: "Querying Database failed! Try again later",
    });
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

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      error: "Invalid Product ID",
      message: "Product ID provided is Invalid or null",
    });
  }

  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
    return res.status(204).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({
      error: "Checking record failed",
      message: "Querying Database failed! Try again later",
    });
  }
};

exports.productDetails = async (req, res, next) => {
  const id = req.body.id;
  const product = await Product.findByPk(id);
  res.status(200).json(product);
};
