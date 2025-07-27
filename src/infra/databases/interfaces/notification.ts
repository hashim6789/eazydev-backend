import { Types, Document } from "mongoose";

export interface INotification extends Document {
  _id: Types.ObjectId;
  title: string;
  message: string;
  recipientId: Types.ObjectId;
  createdAt: Date;
}
