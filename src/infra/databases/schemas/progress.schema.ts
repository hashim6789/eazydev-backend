import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProgress } from "../interfaces";

export const ProgressSchema: Schema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    completedLessons: [
      { type: Schema.Types.ObjectId, ref: "Lessons", required: true },
    ],
    completedMaterials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Materials",
        required: true,
      },
    ],
    isCourseCompleted: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    completedDate: { type: Date },
  },
  {
    timestamps: true,
  }
);
