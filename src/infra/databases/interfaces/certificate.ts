import { ObjectId } from "mongoose";

export interface ICertificate extends Document {
  _id: ObjectId;
  progressId: ObjectId;
  courseId: ObjectId;
  mentorId: ObjectId;
  learnerId: ObjectId;
  issueDate: Date;
}
