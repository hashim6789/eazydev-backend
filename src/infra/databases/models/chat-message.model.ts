import { model } from "mongoose";
import { IChatMessage } from "../interfaces";
import { chatMessageSchema } from "../schemas";

const ChatMessageModel = model<IChatMessage>("ChatMessage", chatMessageSchema);

export default ChatMessageModel;
