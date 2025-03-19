import { ObjectId } from "mongoose";

export interface IChatGroup extends Document {
  _id: ObjectId;
  course: ObjectId;
  mentor: ObjectId;
  learners: ObjectId[];
  createdAt: Date;
}
