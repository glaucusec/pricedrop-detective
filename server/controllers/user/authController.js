const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const { generateUniqueId } = require("../../util/helpers/common");
const { hashPassword, passwordsMatch } = require("../../util/helpers/auth");

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hash = await hashPassword(password);
  const passwordMatch = await passwordsMatch("abhishek", hash);
};
