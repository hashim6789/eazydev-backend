import mongoose from "mongoose";
import { IMaterial } from "../interfaces";
import { materialSchema } from "../schemas";

export const MaterialModel = mongoose.model<IMaterial>(
  "Materials",
  materialSchema
);
