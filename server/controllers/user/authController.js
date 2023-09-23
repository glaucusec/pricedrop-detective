const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecrectToken = process.env.jwtSecret;

const User = require("../../models/User");

const { generateUniqueId } = require("../../util/helpers/common");
const { hashPassword, passwordsMatch } = require("../../util/helpers/auth");

const login = async (req, res, next) => {
  const requestedEmail = req.body.email;
  const requestedPassword = req.body.password;
  console.log({ requestedEmail, requestedPassword });

  try {
    const existingUser = await User.findOne({
      where: {
        email: requestedEmail,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found. Please Register",
      });
    }

    const match = await passwordsMatch(
      requestedPassword,
      existingUser.password
    );
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 6;
    const payload = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      exp: expirationTime,
    };

    const token = jwt.sign(payload, jwtSecrectToken);
    console.log(`<>User named ${existingUser.fullName} created`);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: expirationTime * 1000,
    });

    res.cookie("user_id", existingUser.id, {
      maxAge: expirationTime * 1000,
    });

    return res
      .status(200)
      .json({ message: "Login successful", id: existingUser.id, token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res, next) => {
  const requestedFullName = req.body.name;
  const requestedEmail = req.body.email;
  const requestedUserName = req.body.username;
  const requestedPassword = req.body.password;
  try {
    const existingUser = await User.findOne({
      where: { email: requestedEmail },
      atrributes: ["email"],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email address already exists." });
    }

    const hashedPassword = await hashPassword(requestedPassword);
    const newUser = await User.create({
      id: generateUniqueId(),
      fullName: requestedFullName,
      userName: requestedUserName,
      email: requestedEmail,
      password: hashedPassword,
    });
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 6;
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      exp: expirationTime,
    };

    const token = jwt.sign(payload, jwtSecrectToken);
    console.log(`<>User named ${newUser.fullName} created`);

    res.cookie("token", token, {
      httpOnly: false,
      maxAge: expirationTime,
    });

    res.cookie("user_id", newUser.id, {
      maxAge: expirationTime,
    });

    return res.status(201).json({
      message: "User registered successfully",
      id: `${newUser.id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res, next) => {
  res.clearCookie("token");
  res.clearCookie("user_id");

  // Send a response indicating successful logout
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { login, register, logout };
