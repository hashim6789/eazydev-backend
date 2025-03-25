import { ObjectId } from "mongoose";
import { Role } from "../../../domain/types";

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
