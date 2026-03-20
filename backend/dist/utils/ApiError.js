"use strict";
class ApiError extends Error {
    statusCode;
    success;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        // Note: captureStackTrace is Node.js specific, optional for TS
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
module.exports = ApiError;
//# sourceMappingURL=ApiError.js.map