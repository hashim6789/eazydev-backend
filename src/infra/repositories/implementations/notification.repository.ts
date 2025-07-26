import { Model } from "mongoose";
import { INotification } from "../../databases/interfaces";
import {
  ICreateNotificationInDTO,
  INotificationOutDTO,
} from "../../../domain/dtos";
import { INotificationRepository } from "../interfaces";

export class NotificationRepository implements INotificationRepository {
  private model: Model<INotification>;

  constructor(model: Model<INotification>) {
    this.model = model;
  }

  async create(data: ICreateNotificationInDTO): Promise<INotificationOutDTO> {
    try {
      const createData = new this.model({
        title: data.title,
        message: data.message,
        recipientId: data.recipientId,
      });
      const notification = await createData.save();

      return {
        id: notification._id.toString(),
        title: notification.title,
        message: notification.message,
        recipientId: notification.recipientId.toString(),
        createdAt: notification.createdAt.getTime(),
      };
    } catch (error) {
      console.error("Error while creating notification:", error);
      throw new Error("Lesson creation failed");
    }
  }

  async findAllByRecipientId(id: string): Promise<INotificationOutDTO[]> {
    try {
      const notifications = await this.model.find({ recipientId: id });

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
