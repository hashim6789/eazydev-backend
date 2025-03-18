import mongoose from "mongoose";
import { ICategory } from "../interfaces";
import { CategorySchema } from "../schemas";

export const CategoryModel = mongoose.model<ICategory>(
  "Categories",
  CategorySchema
);
