import { Types, Document } from "mongoose";
export interface ICertificate extends Document {
  _id: Types.ObjectId;
  progressId: Types.ObjectId;
  courseId: Types.ObjectId;
  mentorId: Types.ObjectId;
  learnerId: Types.ObjectId;
  issueDate: Date;
}
