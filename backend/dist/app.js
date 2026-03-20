"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const alertRoutes_1 = __importDefault(require("./routes/alertRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.cors || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use("/alerts/v1", alertRoutes_1.default);
app.use("/auth/v1", authRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
module.exports = app;
//# sourceMappingURL=app.js.map