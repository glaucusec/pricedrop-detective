const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");
const User = require("../models/User");
const Product = require("../models/Product");

const UserProduct = sequelize.define("UserProduct", {
  UserId: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  ProductId: {
    type: DataTypes.STRING,
    references: {
      mode: Product,
      key: 'id',
    },
  },
  trackingStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserProduct;
