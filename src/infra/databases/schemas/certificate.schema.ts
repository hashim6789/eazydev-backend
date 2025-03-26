import { Schema } from "mongoose";
import { ICertificate } from "../interfaces";

export const certificateSchema: Schema = new Schema<ICertificate>(
  {
    progressId: {
      type: Schema.Types.ObjectId,
      ref: "Progress",
      required: true,
    },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    learnerId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    issueDate: { type: Date, default: Date.now(), required: true },
  },
  {
    timestamps: true,
  }
);
