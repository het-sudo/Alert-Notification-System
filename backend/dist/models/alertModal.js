"use strict";
const mongoose_1 = require("mongoose");
const date_fns_1 = require("date-fns");
const alertSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ["info", "warning", "error"],
        default: "info",
    },
    isRead: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
const formatDate = (date) => {
    if (!date)
        return null;
    return (0, date_fns_1.format)(new Date(date), "dd MMM yyyy, hh:mm a");
};
alertSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.createdAt = formatDate(ret.createdAt);
        ret.updatedAt = formatDate(ret.updatedAt);
        ret.deletedAt = formatDate(ret.deletedAt);
        return ret;
    },
});
module.exports = (0, mongoose_1.model)("Alert", alertSchema);
//# sourceMappingURL=alertModal.js.map