const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const sequelize = require("./util/database");
// models
const Product = require("./models/Product");
const Price = require("./models/Price");
const User = require("./models/User");
// relationships
User.belongsToMany(Product, { through: "UserProduct" });
Product.belongsToMany(User, { through: "UserProduct" });
Product.hasMany(Price);

// routes
const userProductRoutes = require("./routes/user/product");
const userAuthRoutes = require("./routes/user/auth");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/api/user", userProductRoutes);
app.use("/api/auth", userAuthRoutes);

sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log("I am listening");
  });
});
