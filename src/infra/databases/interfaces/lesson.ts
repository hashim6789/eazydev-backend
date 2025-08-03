import { Types, Document } from "mongoose";

export interface ILesson extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  mentorId: Types.ObjectId;
  materials: Types.ObjectId[];
}
