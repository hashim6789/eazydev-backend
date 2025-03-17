import mongoose from "mongoose";
import { ICourse } from "../interfaces";
import { CourseSchema } from "../schemas";

export const CourseModel = mongoose.model<ICourse>("Courses", CourseSchema);
