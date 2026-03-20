"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalAlerts = exports.getUnreadAlerts = exports.getReadAlerts = exports.deleteAlert = exports.markAllRead = exports.toggleRead = exports.createAlert = exports.getAllAlerts = void 0;
const alertModal_1 = __importDefault(require("../models/alertModal"));
const axios_1 = __importDefault(require("axios"));
const getAllAlerts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [alerts, total] = await Promise.all([
        alertModal_1.default.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
        alertModal_1.default.countDocuments(),
    ]);
    return { alerts: alerts, total };
};
exports.getAllAlerts = getAllAlerts;
const createAlert = async (data) => {
    return await alertModal_1.default.create(data);
};
exports.createAlert = createAlert;
const toggleRead = async (id) => {
    const alert = await alertModal_1.default.findById(id);
    if (!alert)
        throw new Error("Alert not found");
    alert.isRead = !alert.isRead;
    return (await alert.save());
};
exports.toggleRead = toggleRead;
const markAllRead = async () => {
    return await alertModal_1.default.updateMany({}, { isRead: true });
};
exports.markAllRead = markAllRead;
const deleteAlert = async (id) => {
    const alert = await alertModal_1.default.findByIdAndDelete(id);
    if (!alert)
        throw new Error("Alert not found");
    return true;
};
exports.deleteAlert = deleteAlert;
const getReadAlerts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [alerts, total] = await Promise.all([
        alertModal_1.default.find({ isRead: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        alertModal_1.default.countDocuments({ isRead: true }),
    ]);
    return { alerts: alerts, total };
};
exports.getReadAlerts = getReadAlerts;
const getUnreadAlerts = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [alerts, total] = await Promise.all([
        alertModal_1.default.find({ isRead: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        alertModal_1.default.countDocuments({ isRead: false }),
    ]);
    return { alerts: alerts, total };
};
exports.getUnreadAlerts = getUnreadAlerts;
const getExternalAlerts = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const response = await axios_1.default.get("https://jsonplaceholder.typicode.com/posts");
        const mappedData = response.data.map((post) => ({
            title: post.title,
            message: post.body,
            type: "info",
            isRead: true,
        }));
        const savedDocs = await alertModal_1.default.insertMany(mappedData);
        return await alertModal_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
    }
    catch (error) {
        console.error("Error in sync process:", error);
        throw error;
    }
};
exports.getExternalAlerts = getExternalAlerts;
//# sourceMappingURL=alertService.js.map