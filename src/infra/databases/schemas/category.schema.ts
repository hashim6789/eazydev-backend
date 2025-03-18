import { Schema } from "mongoose";
import { ICategory } from "../interfaces";

export const CategorySchema: Schema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    isListed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
