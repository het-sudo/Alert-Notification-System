const alertService = require("../services/alertService");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const alertModal = require("../models/alertModal");

exports.getAlerts = asyncHandler(async (req, res) => {
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

exports.createAlert = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.message) {
    throw new ApiError(400, "Title and message are required");
  }

  const alert = await alertService.createAlert(req.body);
  res.status(201).json(alert);
});

exports.toggleRead = asyncHandler(async (req, res) => {
  const alert = await alertService.toggleRead(req.params.id);
  if (!alert) throw new ApiError(404, "Alert not found");

  res.json(alert);
});

exports.markAllRead = asyncHandler(async (req, res) => {
  await alertService.markAllRead();
  res.json({ message: "All alerts marked as read" });
});

exports.deleteAlert = asyncHandler(async (req, res) => {
  const deleted = await alertService.deleteAlert(req.params.id);
  if (!deleted) throw new ApiError(404, "Alert not found");

  res.json({ message: "Alert deleted" });
});

exports.getExternalAlerts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const total = await alertModal.countDocuments();

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
