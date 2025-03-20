// models/Meeting.ts

import { ObjectId } from "mongoose";

export interface IMeeting {
  _id: ObjectId;
  courseId: ObjectId;
  mentorId: ObjectId;
  learnerId: ObjectId;
  roomId: string;
  slotId: ObjectId;
  mentorPeerId: string | null;
  learnerPeerId: string | null;
}
