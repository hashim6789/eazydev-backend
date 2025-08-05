import { Model } from "mongoose";
import { INotification } from "../../databases/interfaces";
import { INotificationOutDTO } from "../../../domain/dtos";
import { INotificationRepository } from "../interfaces";
import { BaseRepository } from "./base-repository";

export class NotificationRepository
  extends BaseRepository<INotification>
  implements INotificationRepository
{
  constructor(model: Model<INotification>) {
    super(model);
  }

  async findAllByRecipientId(id: string): Promise<INotificationOutDTO[]> {
    try {
      const notifications = await this._model.find({ recipientId: id });

      return notifications.map((item) => {
        return {
          id: item._id.toString(),
          title: item.title,
          message: item.message,
          recipientId: item.recipientId.toString(),
          createdAt: item.createdAt.getTime(),
        };
      });
    } catch (error) {
      console.error("Error while creating notification:", error);
      throw new Error("Lesson creation failed");
    }
  }
}
