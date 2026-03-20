"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ error: "No token provided - unauthorized" });
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Please Login To Access" });
        }
        req.user = decoded;
        next();
    });
};
module.exports = authMiddleware;
//# sourceMappingURL=auth.js.map