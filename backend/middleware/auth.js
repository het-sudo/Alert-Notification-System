const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided - unauthorized" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, process.env.JWT_SECRET || "SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token - unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authMiddleware };
