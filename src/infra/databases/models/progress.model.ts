import mongoose from "mongoose";
import { IProgress } from "../interfaces";
import { ProgressSchema } from "../schemas";

export const ProgressModel = mongoose.model<IProgress>(
  "Progress",
  ProgressSchema
);
