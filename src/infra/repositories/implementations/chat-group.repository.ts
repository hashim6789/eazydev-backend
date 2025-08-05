import mongoose, { Model } from "mongoose";
import {
  IChatGroupOutDTO,
  IChatGroupOutPopulatedDTO,
  ICreateChatGroupInDTO,
} from "../../../domain/dtos/chat-group";
import { IChatGroup } from "../../databases/interfaces";
import { Role } from "../../../domain/types";
import { findAllChatGroupByUserAndRolePipeline } from "../../pipelines";
import { IChatGroupRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class ChatGroupRepository
  extends BaseRepository<IChatGroup>
  implements IChatGroupRepository
{
  constructor(model: Model<IChatGroup>) {
    super(model);
  }

  async findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IChatGroupOutPopulatedDTO[]> {
    try {
      const groups = await this._model.aggregate(
        findAllChatGroupByUserAndRolePipeline(role, userId)
      );

      return groups as IChatGroupOutPopulatedDTO[];
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async addLearnerToChatGroup(
    courseId: string,
    learnerId: string
  ): Promise<boolean> {
    try {
      const result = await this._model.updateOne(
        { course: courseId },
        { $addToSet: { learners: learnerId } }
      );

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
