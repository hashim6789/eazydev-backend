import { Model } from "mongoose";
import { INotificationRepository } from "../../app/repositories";
import { INotification } from "../databases/interfaces";
import {
  ICreateNotificationInDTO,
  INotificationOutDTO,
} from "../../domain/dtos";

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
}
