"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.logoutUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const userModals_1 = __importDefault(require("../models/userModals"));
const registerUser = async ({ name, email, password, }) => {
    try {
        const exist = await userModals_1.default.findOne({ email });
        if (exist) {
            throw new ApiError_1.default(400, "Email already exists");
        }
        const hashedpassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await userModals_1.default.create({
            name,
            email,
            password: hashedpassword,
        });
        const { password: storedPassword, ...userWithoutPassword } = newUser.toObject();
        return userWithoutPassword;
    }
    catch (error) {
        throw new ApiError_1.default(500, error.message || "Internal server error");
    }
};
exports.registerUser = registerUser;
const logoutUser = async (token) => {
    try {
        // blacklistedTokens.add(token);
        return { message: "Logged out successfully" };
    }
    catch (error) {
        throw new ApiError_1.default(500, error.message || "Logout failed");
    }
};
exports.logoutUser = logoutUser;
const loginUser = async ({ email, password }) => {
    try {
        const exist = await userModals_1.default.findOne({ email });
        if (!exist) {
            throw new ApiError_1.default(401, "Email Not found");
        }
        const passwordmatch = await bcrypt_1.default.compare(password, exist.password);
        if (!passwordmatch) {
            throw new ApiError_1.default(401, "Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ userId: exist._id, email: exist.email }, process.env.JWT_SECRET || "SECRET", { expiresIn: "1d" });
        return {
            token,
            user: {
                _id: exist._id,
                name: exist.name,
                email: exist.email,
            },
        };
    }
    catch (error) {
        throw new ApiError_1.default(500, error.message || "Internal server error");
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map