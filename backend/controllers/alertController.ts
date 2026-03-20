import * as alertService from "../services/alertService";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import Alert from "../models/alertModal";
import { TypedRequest, CreateAlertRequest } from "../types";
import { Response, RequestHandler } from "express";

export const getAlerts: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
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
  },
);

export const createAlert: RequestHandler = asyncHandler(
  async (req: TypedRequest<CreateAlertRequest>, res: Response) => {
    if (!req.body.title || !req.body.message) {
      throw new ApiError(400, "Title and message are required");
    }

    const alert = await alertService.createAlert(req.body);
    res.status(201).json(alert);
  },
);

export const toggleRead: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
    const alert = await alertService.toggleRead(req.params.id);
    if (!alert) throw new ApiError(404, "Alert not found");

    res.json(alert);
  },
);

export const markAllRead: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
    await alertService.markAllRead();
    res.json({ message: "All alerts marked as read" });
  },
);

export const deleteAlert: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
    await alertService.deleteAlert(req.params.id);
    res.json({ message: "Alert deleted" });
  },
);

export const getReadAlerts: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
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
  },
);

export const getUnreadAlerts: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
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
  },
);

export const getExternalAlerts: RequestHandler = asyncHandler(
  async (req: TypedRequest, res: Response) => {
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "10");
    const total = await Alert.countDocuments();

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
  },
);
