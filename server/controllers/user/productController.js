const uuid = require("uuid");

const Product = require("../../models/Product");
const UserProduct = require("../../models/UserProduct");
const sequelize = require("../../util/database");
const {
  isValidURL,
  generateUniqueId,
  URLPrettier,
} = require("../../util/helpers/common");
const {
  findProductData,
  findDetailedProductInfo,
} = require("../../util/scrapers");

exports.getAllProducts = async (req, res, next) => {
  // console.log(req.user);
  const userId = req.user.id;
  const query = `
  SELECT products.id AS id, 
  products.title AS title, 
  products.price AS price, 
  products.url AS url, 
  products.imageURL as imageURL,
  userproducts.trackingStatus
  FROM products
  INNER JOIN userproducts ON products.id = userproducts.productId AND '${userId}' = userproducts.userId
`;
  const products = await sequelize.query(query);

  res.status(200).json(products[0]);
};

exports.addNewProduct = async (req, res, next) => {
  const url = URLPrettier(req.body.url);

  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid URL Address" });
  }
  try {
    const { title, price, imageURL, rating } = await findProductData(url);
    const product = await req.user.createProduct({
      id: generateUniqueId(),
      title: title,
      price: price,
      url: url,
      imageURL: imageURL,
      rating: rating,
    });

    const returnData = {
      id: product.id,
      title: product.title,
      price: product.price,
      url: product.url,
      imageURL: product.imageURL,
      rating: rating,
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
    const record = await UserProduct.findOne({
      where: {
        ProductId: id,
        UserId: req.user.id,
      },
    });
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
    const product = await req.user.getProducts({ where: { id: id } });
    await req.user.removeProduct(product);
    return res.status(204).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Checking record failed",
      message: "Querying Database failed! Try again later",
    });
  }
};

exports.productDetails = async (req, res, next) => {
  const id = req.body.id;
  const product = await Product.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  res.status(200).json(product);
};

exports.productDetailedInfo = async (req, res, next) => {
  const id = req.body.id;
  const product = await Product.findByPk(id, { attributes: ["url"] });
  const url = product.url;
  const detailedInfo = await findDetailedProductInfo(url);
  return res.status(200).json(detailedInfo);
};
