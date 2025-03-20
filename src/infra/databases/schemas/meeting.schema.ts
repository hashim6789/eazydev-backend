import { Schema } from "mongoose";
import { IMeeting } from "../interfaces";

export const MeetingSchema: Schema<IMeeting> = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: "Courses" },
    learnerId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    mentorId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    slotId: { type: Schema.Types.ObjectId, required: true, ref: "Slots" },
    roomId: { type: String, required: true },
    mentorPeerId: { type: String, default: null },
    learnerPeerId: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);
