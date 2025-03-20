import mongoose from "mongoose";
import { MeetingSchema } from "../schemas";
import { IMeeting } from "../interfaces";

export const MeetingModel = mongoose.model<IMeeting>("Meetings", MeetingSchema);
