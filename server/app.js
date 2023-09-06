const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const sequelize = require("./util/database");
// models
const Product = require("./models/Product");
// routes
const userProductRoutes = require("./routes/user/product");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/api/user", userProductRoutes);

sequelize.sync().then((result) => {
  app.listen(port, () => {
    console.log("I am listening");
  });
});
