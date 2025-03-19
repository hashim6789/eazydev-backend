import { Model } from "mongoose";
import { IChatGroupRepository } from "../../app/repositories";
import {
  IChatGroupOutDTO,
  ICreateChatGroupInDTO,
} from "../../domain/dtos/chat-group";
import { IChatGroup } from "../databases/interfaces";

export class ChatGroupRepository implements IChatGroupRepository {
  private model: Model<IChatGroup>;

  constructor(model: Model<IChatGroup>) {
    this.model = model;
  }
  async create(data: ICreateChatGroupInDTO): Promise<IChatGroupOutDTO> {
    try {
      const createData = new this.model({
        course: data.course,
        mentor: data.mentor,
        learners: [],
      });
      const chatGroup = await createData.save();

      return {
        id: chatGroup._id.toString(),
        course: chatGroup.course.toString(),
        mentor: chatGroup.mentor.toString(),
        learners: chatGroup.learners.map((item) => item.toString()),
        createdAt: chatGroup.createdAt.getTime(),
      };
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
