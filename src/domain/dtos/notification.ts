import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";
export interface INotificationOutDTO {
  id: string;
  title: string;
  message: string;
  recipientId: string;
  createdAt: number;
}

export type ICreateNotificationInDTO = Omit<INotificationOutDTO, "id">;
export type IGetAllNotificationRequestDTO = Pick<
  ICreateNotificationInDTO,
  "recipientId"
>;

//

export const GetNotificationsBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});
