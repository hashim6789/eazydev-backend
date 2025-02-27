import { Schema, model, Document, ObjectId } from "mongoose";
import { Role } from "../../../domain/dtos/role.dtos";

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "mentor", "learner"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
