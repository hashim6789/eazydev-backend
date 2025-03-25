import { Schema } from "mongoose";
import { IOtp } from "../interfaces";

export const otpSchema: Schema = new Schema<IOtp>(
  {
    userId: { type: Schema.Types.ObjectId },
    otp: { type: String, required: true },
    expiresIn: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);
