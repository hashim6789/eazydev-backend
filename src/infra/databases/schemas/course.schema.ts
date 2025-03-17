import { Schema } from "mongoose";
import { ICourse } from "../interfaces";

export const CourseSchema: Schema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    description: { type: String },
    thumbnail: { type: String },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lessons" }],
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["draft", " pending", " published", " rejected"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);
