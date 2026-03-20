import mongoose, { Schema, model, Document } from "mongoose";
import { IUser } from "../types";

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export = model<IUser>("User", userSchema);
