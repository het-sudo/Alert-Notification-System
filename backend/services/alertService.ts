import Alert from "../models/alertModal";
import axios from "axios";
import ApiError from "../utils/ApiError";
import { CreateAlertRequest, IAlert } from "../types";

export const getAllAlerts = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ alerts: IAlert[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [alerts, total] = await Promise.all([
    Alert.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Alert.countDocuments(),
  ]);

  return { alerts: alerts as IAlert[], total };
};

export const createAlert = async (
  data: CreateAlertRequest,
): Promise<IAlert> => {
  return await Alert.create(data);
};

export const toggleRead = async (id: string): Promise<IAlert> => {
  const alert = await Alert.findById(id);
  if (!alert) throw new Error("Alert not found");

  alert.isRead = !alert.isRead;
  return (await alert.save()) as IAlert;
};

export const markAllRead = async (): Promise<any> => {
  return await Alert.updateMany({}, { isRead: true });
};

export const deleteAlert = async (id: string): Promise<boolean> => {
  const alert = await Alert.findByIdAndDelete(id);
  if (!alert) throw new Error("Alert not found");
  return true;
};

export const getReadAlerts = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ alerts: IAlert[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [alerts, total] = await Promise.all([
    Alert.find({ isRead: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Alert.countDocuments({ isRead: true }),
  ]);

  return { alerts: alerts as IAlert[], total };
};

export const getUnreadAlerts = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ alerts: IAlert[]; total: number }> => {
  const skip = (page - 1) * limit;

  const [alerts, total] = await Promise.all([
    Alert.find({ isRead: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Alert.countDocuments({ isRead: false }),
  ]);

  return { alerts: alerts as IAlert[], total };
};

export const getExternalAlerts = async (
  page: number = 1,
  limit: number = 10,
): Promise<IAlert[]> => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    const mappedData = response.data.map((post: any) => ({
      title: post.title,
      message: post.body,
      type: "info" as const,
      isRead: true,
    }));

    const savedDocs = await Alert.insertMany(mappedData);

    return await Alert.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as any));
  } catch (error) {
    console.error("Error in sync process:", error);
    throw error;
  }
};
