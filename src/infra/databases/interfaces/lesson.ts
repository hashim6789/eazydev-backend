import { ObjectId } from "mongoose";

export interface ILesson extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  mentorId: ObjectId;
  duration: number;
  materials: ObjectId[];
}
