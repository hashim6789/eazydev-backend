import { Schema, model, Document, ObjectId } from "mongoose";
import { Role } from "../../../domain/types/user";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isVerified: boolean;
  profilePicture: string;
  googleId: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
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

export const User = model<IUser>("Users", userSchema);
