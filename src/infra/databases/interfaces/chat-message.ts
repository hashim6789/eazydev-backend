import { ObjectId } from "mongoose";

export interface IChatMessage extends Document {
  group: ObjectId;
  sender: ObjectId;
  message: string;
  createdAt: Date;
}
