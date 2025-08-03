import { Types } from "mongoose";
import { NotificationEntity } from "../../../domain/entities";
import { INotification } from "../interfaces";
import { INotificationOutDTO } from "../../../domain/dtos";

export const mapNotificationToDocument = (
  entity: NotificationEntity
): Partial<INotification> => {
  return {
    title: entity.title,
    recipientId: new Types.ObjectId(entity.recipientId),
    message: entity.message,
    createdAt: new Date(entity.createdAt),
  };
};

export function mapNotificationToDTO(
  material: INotification
): INotificationOutDTO {
  return {
    id: material._id.toString(),
    title: material.title,
    recipientId: material.recipientId.toString(),
    message: material.message,
    createdAt: material.createdAt.getTime(),
  };
}
