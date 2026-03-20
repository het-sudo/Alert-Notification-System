"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map