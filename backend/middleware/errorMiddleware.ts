import { ErrorRequestHandler } from "express";
import ApiError from "../utils/ApiError";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
