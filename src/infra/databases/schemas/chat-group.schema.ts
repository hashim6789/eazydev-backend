import { Schema } from "mongoose";
import { IChatGroup } from "../interfaces";

export const ChatGroupSchema: Schema<IChatGroup> = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  learners: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  createdAt: { type: Date, default: Date.now },
});
