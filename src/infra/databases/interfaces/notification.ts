import { ObjectId } from "mongoose";

export interface INotification extends Document {
  _id: ObjectId;
  title: string;
  message: string;
  recipientId: ObjectId;
  createdAt: Date;
}
