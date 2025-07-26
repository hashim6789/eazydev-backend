import { Model } from "mongoose";
import { IChatMessage } from "../../databases/interfaces";
import {
  IChatMessageOutDTO,
  IChatMessagePopulatedDTO,
} from "../../../domain/dtos";
import { ChatMessageEntity } from "../../../domain/entities";
import { IChatMessageRepository } from "../interfaces";

export class ChatMessageRepository implements IChatMessageRepository {
  private model: Model<IChatMessage>;

  constructor(model: Model<IChatMessage>) {
    this.model = model;
  }

  async create(data: ChatMessageEntity): Promise<IChatMessageOutDTO> {
    try {
      const createData = new this.model({
        group: data.group,
        sender: data.sender,
        message: data.message,
        createdAt: data.createdAt,
      });
      const message = await createData.save();
      return {
        id: message._id.toString(),
        group: message.group.toString(),
        sender: message.sender.toString(),
        message: message.message,
        createdAt: message.createdAt.getTime(),
      };
    } catch (error) {
      console.error("Error while creating chatGroup:", error);
      throw new Error("Chat message creation failed");
    }
  }

  async findAllByGroup(groupId: string): Promise<IChatMessagePopulatedDTO[]> {
    try {
      const messages = await this.model
        .find({ group: groupId })
        .populate("sender", "firstName lastName profilePicture");

      return messages.map((message) => {
        const {
          _id: senderId,
          firstName,
          lastName,
          profilePicture,
        } = message.sender as unknown as {
          _id: string;
          firstName: string;
          lastName: string;
          profilePicture: string;
        };
        return {
          id: message._id.toString(),
          group: message.group.toString(),
          sender: {
            id: senderId.toString(),
            name: `${firstName} ${lastName || ""}`,
            profilePicture,
          },
          message: message.message,
          createdAt: message.createdAt.getTime(),
        };
      });
    } catch (error) {
      console.error("Error while fetching chat messages:", error);
      throw new Error("Chat message fetching failed");
    }
  }
}
