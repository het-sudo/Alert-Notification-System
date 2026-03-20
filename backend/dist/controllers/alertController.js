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
exports.getExternalAlerts = exports.getUnreadAlerts = exports.getReadAlerts = exports.deleteAlert = exports.markAllRead = exports.toggleRead = exports.createAlert = exports.getAlerts = void 0;
const alertService = __importStar(require("../services/alertService"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const alertModal_1 = __importDefault(require("../models/alertModal"));
exports.getAlerts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { alerts, total } = await alertService.getAllAlerts(page, limit);
    res.json({
        success: true,
        data: alerts,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    });
});
exports.createAlert = (0, asyncHandler_1.default)(async (req, res) => {
    if (!req.body.title || !req.body.message) {
        throw new ApiError_1.default(400, "Title and message are required");
    }
    const alert = await alertService.createAlert(req.body);
    res.status(201).json(alert);
});
exports.toggleRead = (0, asyncHandler_1.default)(async (req, res) => {
    const alert = await alertService.toggleRead(req.params.id);
    if (!alert)
        throw new ApiError_1.default(404, "Alert not found");
    res.json(alert);
});
exports.markAllRead = (0, asyncHandler_1.default)(async (req, res) => {
    await alertService.markAllRead();
    res.json({ message: "All alerts marked as read" });
});
exports.deleteAlert = (0, asyncHandler_1.default)(async (req, res) => {
    await alertService.deleteAlert(req.params.id);
    res.json({ message: "Alert deleted" });
});
exports.getReadAlerts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { alerts, total } = await alertService.getReadAlerts(page, limit);
    res.json({
        success: true,
        data: alerts,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    });
});
exports.getUnreadAlerts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { alerts, total } = await alertService.getUnreadAlerts(page, limit);
    res.json({
        success: true,
        data: alerts,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    });
});
exports.getExternalAlerts = (0, asyncHandler_1.default)(async (req, res) => {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const total = await alertModal_1.default.countDocuments();
    const alerts = await alertService.getExternalAlerts(page, limit);
    res.json({
        success: true,
        data: alerts,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / limit),
        },
    });
});
//# sourceMappingURL=alertController.js.map