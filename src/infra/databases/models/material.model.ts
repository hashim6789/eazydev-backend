import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import { MaterialType } from "../../../domain/dtos/material";

//interface for basic Material
export interface IMaterial extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  mentorId: ObjectId;
  type: MaterialType;
  duration: number;
  fileKey: string;
}

// Base schema
const materialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "Mentors", required: true },
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

const MaterialModel = mongoose.model<IMaterial>("Materials", materialSchema);

export default MaterialModel;
