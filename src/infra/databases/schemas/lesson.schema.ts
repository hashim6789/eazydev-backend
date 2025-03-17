import { Schema } from "mongoose";
import { ILesson } from "../interfaces";

export const LessonsSchema: Schema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String },
    mentorId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    materials: [{ type: Schema.Types.ObjectId, ref: "Materials" }],
  },
  {
    timestamps: true,
  }
);
