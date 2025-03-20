import { ObjectId } from "mongoose";

export interface IProgress extends Document {
  _id: ObjectId;
  userId: ObjectId;
  mentorId: ObjectId;
  courseId: ObjectId;
  completedLessons: ObjectId[];
  completedMaterials: ObjectId[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: Date | null;
}
