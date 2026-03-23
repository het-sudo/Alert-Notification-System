import { Document, Types } from "mongoose";
import { Request } from "express";
export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}
export interface IAlert extends Document {
    _id: Types.ObjectId;
    title: string;
    message: string;
    type: "info" | "warning" | "error";
    isRead: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface CreateAlertRequest {
    title: string;
    message: string;
    type?: "info" | "warning" | "error";
}
export interface TypedRequest<T = {}> extends Request {
    body: T;
    user?: {
        userId: string;
        email: string;
    };
}
//# sourceMappingURL=index.d.ts.map