import { Model } from "mongoose";
import { IChatMessage } from "../../databases/interfaces";
import { IChatMessagePopulatedDTO } from "../../../domain/dtos";
import { IChatMessageRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class ChatMessageRepository
  extends BaseRepository<IChatMessage>
  implements IChatMessageRepository
{
  constructor(model: Model<IChatMessage>) {
    super(model);
  }

  async findAllByGroup(groupId: string): Promise<IChatMessagePopulatedDTO[]> {
    try {
      const messages = await this._model
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
