import { model } from "mongoose";
import { IChatGroup } from "../interfaces";
import { ChatGroupSchema } from "../schemas";

export const ChatGroupModel = model<IChatGroup>("ChatGroup", ChatGroupSchema);
