import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { ISlot } from "../interfaces";

export const SlotSchema: Schema = new Schema<ISlot>(
  {
    mentorId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    time: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
