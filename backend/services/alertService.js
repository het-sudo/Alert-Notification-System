const Alert = require("../models/alertModal");
const axios = require("axios");
const { user } = require("../models/userModals");
const ApiError = require("../utils/ApiError");

exports.getAllAlerts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [alerts, total] = await Promise.all([
    Alert.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),

    Alert.countDocuments(),
  ]);

  return { alerts, total };
};

exports.createAlert = async (data) => {
  return await Alert.create(data);
};

exports.toggleRead = async (id) => {
  const alert = await Alert.findById(id);
  if (!alert) throw new Error("Alert not found");

  alert.isRead = !alert.isRead;
  return await alert.save();
};

exports.markAllRead = async () => {
  return await Alert.updateMany({}, { isRead: true });
};

exports.deleteAlert = async (id) => {
  const alert = await Alert.findByIdAndDelete(id);
  if (!alert) throw new Error("Alert not found");
  return alert;
};

exports.getExternalAlerts = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    const mappedData = response.data.map((post) => ({
      title: post.title,
      message: post.body,
      type: "info",
      isRead: true,
    }));

    const savedDocs = await Alert.insertMany(mappedData);

    return await Alert.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
  } catch (error) {
    console.error("Error in sync process:", error);
    throw error;
  }
};
