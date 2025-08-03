import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  title: string;
  isListed: boolean;
}
