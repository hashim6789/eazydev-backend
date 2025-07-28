import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";
export interface IChatGroupOutDTO {
  id: string;
  course: string;
  mentor: string;
  learners: string[];
  createdAt: number;
}

export type ICreateChatGroupInDTO = Omit<IChatGroupOutDTO, "id">;
export type IGetAllChatMessagesRequestDTO = { groupId: string };

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface IChatGroupOutPopulatedDTO {
  id: string;
  title: string;
  thumbnail: string;
  memberCount: number;
  mentor: User | null;
  learners: User[];
}

export const CreateChatMessageSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  message: z.string().min(1, "Message cannot be empty"),
  groupId: ObjectIdSchema,
});

export type CreateChatMessageDTO = z.infer<typeof CreateChatMessageSchema>;

//
export const GetAllChatGroupSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

export type GetAllChatGroupDTO = z.infer<typeof GetAllChatGroupSchema>;

export const GetAllChatMessagesBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

export const GetAllChatMessagesPathSchema = z.object({
  groupId: ObjectIdSchema,
});

export type GetAllChatMessagesBodyDTO = z.infer<
  typeof GetAllChatMessagesBodySchema
>;
export type GetAllChatMessagesPathDTO = z.infer<
  typeof GetAllChatMessagesPathSchema
>;
