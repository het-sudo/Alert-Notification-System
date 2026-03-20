import mongoose, { Schema, model, Document } from "mongoose";
import { IAlert } from "../types";
import { format } from "date-fns";

const alertSchema: Schema<IAlert> = new Schema(
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
  { timestamps: true },
);

const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
};

alertSchema.set("toJSON", {
  transform: (doc: any, ret: any) => {
    ret.createdAt = formatDate(ret.createdAt);
    ret.updatedAt = formatDate(ret.updatedAt);
    ret.deletedAt = formatDate(ret.deletedAt);
    return ret;
  },
});

export = model<IAlert>("Alert", alertSchema);
