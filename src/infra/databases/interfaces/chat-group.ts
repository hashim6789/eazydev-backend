import { Types, Document } from "mongoose";

export interface IChatGroup extends Document {
  _id: Types.ObjectId;
  course: Types.ObjectId;
  mentor: Types.ObjectId;
  learners: Types.ObjectId[];
  createdAt: Date;
}
