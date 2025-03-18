import { ObjectId } from "mongoose";
import { MaterialType } from "../../../domain/types";

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
