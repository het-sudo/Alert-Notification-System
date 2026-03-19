const mongoose = require('mongoose');
const { format } = require("date-fns");



const alertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info",
    },
    isRead: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);


const formatDate = (date) => {
  if (!date) return null;
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
};

alertSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.createdAt = formatDate(ret.createdAt);
    ret.updatedAt = formatDate(ret.updatedAt);
    ret.deletedAt = formatDate(ret.deletedAt);
    return ret;
    
  },
});

module.exports = mongoose.model('Alert', alertSchema);
