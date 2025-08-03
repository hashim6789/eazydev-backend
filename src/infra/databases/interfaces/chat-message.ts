import { Types, Document } from "mongoose";

export interface IChatMessage extends Document {
  _id: Types.ObjectId;
  group: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
  createdAt: Date;
}
