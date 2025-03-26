import { Schema, Types } from "mongoose";
import { IRefreshToken } from "../interfaces";

// Define the Refresh Token schema
export const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Types.ObjectId, required: true },
  expiresIn: { type: Number, required: true },
  role: { type: String, enum: ["admin", "mentor", "learner"], required: true },
  createdAt: { type: Date, default: Date.now },
});
