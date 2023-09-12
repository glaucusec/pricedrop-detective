const jwt = require("jsonwebtoken");
require("dotenv").config;
const jwtSecrectToken = process.env.jwtSecret;

const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  // get the cookie named token
  let cookieString = req.headers["cookie"];
  if (cookieString) {
    cookieString = cookieString.split(" ").join("");
  } else {
    return res
      .status(401)
      .json({ message: "Token is not Provided", state: "EmptyToken" });
  }
  const cookies = cookieString.split(";");

  let token = null;
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name == "token") {
      token = value;
      break;
    }
  }

  try {
    const decoded = jwt.verify(token, jwtSecrectToken);
    const user = await User.findOne({
      where: { id: decoded.id, email: decoded.email },
      attributes: ["id", "email"],
    });
    req.user = user;
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Expired. Please Login Again",
        state: "ExpiredToken",
      });
    } else if (error.name == "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid Token. Please login and Try Again",
        state: "InvalidToken",
      });
    } else {
      console.log('Error @ middleware: authenticate.js"', error.name);
    }
  }
};

module.exports = { authenticateToken };
