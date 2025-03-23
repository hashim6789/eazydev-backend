import { Schema } from "mongoose";
import { IChatMessage } from "../interfaces";

export const chatMessageSchema: Schema<IChatMessage> = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "ChatGroup", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
