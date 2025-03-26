import { Schema } from "mongoose";
import { IUser } from "../interfaces";

export const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String },
    googleId: { type: String },
    role: {
      type: String,
      enum: ["admin", "mentor", "learner"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
