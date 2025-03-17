import { ObjectId } from "mongoose";
import { CourseStatus } from "../../../domain/types";

export interface ICourse extends Document {
  _id: ObjectId;
  title: string;
  mentorId: ObjectId;
  categoryId: ObjectId;
  description: string | null;
  thumbnail: string;
  lessons: ObjectId[];
  price: number;
  status: CourseStatus;
}
