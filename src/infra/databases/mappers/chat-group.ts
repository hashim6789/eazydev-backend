import { Types } from "mongoose";
import { ChatGroupEntity } from "../../../domain/entities";
import { IChatGroup } from "../interfaces";
export const mapChatGroupToDocument = (
  entity: ChatGroupEntity
): Partial<IChatGroup> => {
  return {
    course: new Types.ObjectId(entity.course),
    mentor: new Types.ObjectId(entity.mentor),
    learners: entity.learners.map((learner) => new Types.ObjectId(learner)),
    createdAt: new Date(entity.createdAt),
  };
};
