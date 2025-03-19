import { Schema, model, Document } from "mongoose";
import { INotification } from "../interfaces";
import { notificationSchema } from "../schemas";

export const NotificationModel = model<INotification>(
  "Notification",
  notificationSchema
);
