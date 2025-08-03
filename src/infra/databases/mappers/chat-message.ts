import { ChatMessageEntity } from "../../../domain/entities";
import { IChatMessage } from "../interfaces";
import { Types } from "mongoose";

export const mapChatMessageToDocument = (
  entity: ChatMessageEntity
): Partial<IChatMessage> => {
  return {
    group: new Types.ObjectId(entity.group),
    sender: new Types.ObjectId(entity.sender),
    message: entity.message,
    createdAt: new Date(entity.createdAt),
  };
};
