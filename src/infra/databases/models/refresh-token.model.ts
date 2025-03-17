import { model, ObjectId, Schema, Types } from "mongoose";
import { Role } from "../../../domain/types/user";
export interface IRefreshToken extends Document {
  _id: ObjectId;
  userId: ObjectId;
  expiresIn: number;
  role: Role;
  createdAt: Date;
}
// Define the Refresh Token schema
const refreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Types.ObjectId, required: true },
  expiresIn: { type: Number, required: true },
  role: { type: String, enum: ["admin", "mentor", "learner"], required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Refresh Token model
export const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);
