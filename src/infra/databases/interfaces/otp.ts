import { ObjectId } from "mongoose";

export interface IOtp extends Document {
  _id: ObjectId;
  otp: string;
  userId: ObjectId;
  expiresIn: Date;
}
