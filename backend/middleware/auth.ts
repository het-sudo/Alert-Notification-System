import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import ApiError from "../utils/ApiError";

const authMiddleware: RequestHandler = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "No token provided - unauthorized" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, process.env.JWT_SECRET || "SECRET", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Please Login To Access" });
    }
    (req as any).user = decoded;
    next();
  });
};

export = authMiddleware;
