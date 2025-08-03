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
  // private model: Model<IChatGroup>;

  constructor(model: Model<IChatGroup>) {
    super(model);
    // this.model = model;
  }
  // async create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO> {
  //   try {
  //     const createData = new this.model({
  //       course: data.course,
  //       mentor: data.mentor,
  //       learners: [],
  //     });
  //     const chatGroup = await createData.save();

  //     return {
  //       id: chatGroup._id.toString(),
  //       course: chatGroup.course.toString(),
  //       mentor: chatGroup.mentor.toString(),
  //       learners: chatGroup.learners.map((item) => item.toString()),
  //       createdAt: chatGroup.createdAt.getTime(),
  //     };
  //   } catch (error) {
  //     console.error("Error while creating chatGroup:", error);
  //     throw new Error("Lesson creation failed");
  //   }
  // }

  async findAllByUserAndRole(
    userId: string,
    role: Role
  ): Promise<IChatGroupOutPopulatedDTO[]> {
    try {
      const groups = await this.model.aggregate(
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
      const result = await this.model.updateOne(
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
