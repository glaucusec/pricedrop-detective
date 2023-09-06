const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    set(value) {
      const parsedValue = parseFloat(value.replace(/,/g, ""));

      if (!isNaN(parsedValue)) {
        this.setDataValue("price", parsedValue);
      } else {
        throw new Error("Invalid price format");
      }
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trackingStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Product;
