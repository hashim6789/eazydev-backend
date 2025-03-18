import { Schema } from "mongoose";
import { IMaterial } from "../interfaces";

// Base schema
export const materialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    type: {
      type: String,
      required: true,
      enum: ["reading", "video"],
    },
    duration: { type: Number, required: true },
    fileKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
