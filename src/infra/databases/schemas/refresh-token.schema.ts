import { Schema, Types } from "mongoose";
import { IToken } from "../interfaces";

// Define the Refresh Token schema
export const refreshTokenSchema = new Schema<IToken>({
  userId: { type: Types.ObjectId, required: true },
  type: { type: String, enum: ["refresh", "reset"], required: true },
  expiresIn: { type: Number, required: true },
  role: { type: String, enum: ["admin", "mentor", "learner"], required: true },
  createdAt: { type: Date, default: Date.now },
});
