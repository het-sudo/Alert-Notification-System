"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else {
        message = err.message || "Internal Server Error";
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
module.exports = { errorHandler };
//# sourceMappingURL=errorMiddleware.js.map