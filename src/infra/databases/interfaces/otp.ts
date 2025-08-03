import { Types, Document } from "mongoose";

export interface IOtp extends Document {
  _id: Types.ObjectId;
  otp: string;
  userId: Types.ObjectId;
  expiresIn: Date;
}
