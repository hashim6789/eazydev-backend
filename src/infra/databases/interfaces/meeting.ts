import { Types, Document } from "mongoose";

export interface IMeeting extends Document {
  _id: Types.ObjectId;
  courseId: Types.ObjectId;
  mentorId: Types.ObjectId;
  learnerId: Types.ObjectId;
  roomId: string;
  slotId: Types.ObjectId;
  mentorPeerId: string | null;
  learnerPeerId: string | null;
}
