import { Types, Document } from "mongoose";

export interface IProgress extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  mentorId: Types.ObjectId;
  courseId: Types.ObjectId;
  completedLessons: Types.ObjectId[];
  completedMaterials: Types.ObjectId[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: Date | null;
}
