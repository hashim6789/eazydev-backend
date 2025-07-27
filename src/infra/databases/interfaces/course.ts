import { Types, Document } from "mongoose";
import { CourseStatus } from "../../../domain/types";

export interface ICourse extends Document {
  _id: Types.ObjectId;
  title: string;
  mentorId: Types.ObjectId;
  categoryId: Types.ObjectId;
  description: string;
  thumbnail: string;
  lessons: Types.ObjectId[];
  price: number;
  status: CourseStatus;
}
