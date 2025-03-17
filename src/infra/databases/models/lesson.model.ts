import mongoose, { Schema } from "mongoose";
import { ILesson } from "../interfaces/lesson";
import { LessonsSchema } from "../schemas";

export const LessonModel = mongoose.model<ILesson>("Lessons", LessonsSchema);
