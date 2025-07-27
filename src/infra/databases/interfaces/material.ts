import { Types, Document } from "mongoose";
import { MaterialType } from "../../../domain/types";

export interface IMaterial extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  mentorId: Types.ObjectId;
  type: MaterialType;
  duration: number;
  fileKey: string;
}
