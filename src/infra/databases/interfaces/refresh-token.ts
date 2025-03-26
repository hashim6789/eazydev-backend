import { ObjectId } from "mongoose";
import { Role } from "../../../domain/types";

export interface IRefreshToken extends Document {
  _id: ObjectId;
  userId: ObjectId;
  expiresIn: number;
  role: Role;
  createdAt: Date;
}
