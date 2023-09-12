const authenticateToken = async (req, res, next) => {
  const header = req.headers["cookie"];
  console.log(header);
  next();
};

module.exports = { authenticateToken };
