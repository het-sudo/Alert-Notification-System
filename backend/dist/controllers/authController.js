"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const authService = __importStar(require("../services/authService"));
exports.register = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError_1.default(400, "All fields are required");
    }
    const newUser = await authService.registerUser({ name, email, password });
    res.status(201).json({
        message: "User registered successfully",
        user: newUser,
    });
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.default(400, "All fields are required");
    }
    const { token, user } = await authService.loginUser({ email, password });
    res.status(200).json({
        message: "User login success",
        token,
        user,
    });
});
exports.logout = (0, asyncHandler_1.default)(async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError_1.default(400, "Token is required");
    }
    await authService.logoutUser(token);
    res.status(200).json({
        message: "User logged out successfully",
    });
});
//# sourceMappingURL=authController.js.map