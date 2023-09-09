const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hash(password, 10);
      resolve(hash);
    } catch (err) {
      reject("Error @authjs:hashPassword ", err);
    }
  });
};

const passwordsMatch = (plainTextPassword, hash) => {
  return new Promise(async (resolve, reject) => {
    try {
      const match = await bcrypt.compare(plainTextPassword, hash);
      resolve(match);
    } catch (err) {
      reject("Error @authjs:hashPassword ", err);
    }
  });
};

module.exports = { hashPassword, passwordsMatch };
