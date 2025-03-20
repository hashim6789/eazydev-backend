import { ObjectId } from "mongoose";

export interface ISlot {
  _id: ObjectId;
  mentorId: ObjectId;
  time: number;
  isBooked: boolean;
}
