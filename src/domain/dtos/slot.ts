import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";

export interface Slot {
  id: string;
  mentorId: string;
  time: number;
  isBooked: boolean;
}

export type ICreateSlotRequestDTO = Omit<Slot, "id" | "isBooked">;
export type IGetAllSlotRequestDTO = { mentorId: string };
export type IBookSlotRequestDTO = {
  learnerId: string;
  slotId: string;
  progressId: string;
};

export interface ISlotOutDTO {
  id: string;
  mentorId: string;
  time: number;
  isBooked: boolean;
}
export interface ISlotOutPopulatedDTO {
  id: string;
  mentor: { id: string; firstName: string; lastName: string };
  time: number;
  isBooked: boolean;
}

//
//
export const BookSlotBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  progressId: ObjectIdSchema,
  learnerId: ObjectIdSchema,
});

// BookSlotPathSchema.ts
export const BookSlotPathSchema = z.object({
  slotId: ObjectIdSchema,
});

//
export const CreateSlotRequestSchema = z.object({
  mentorId: ObjectIdSchema,
  time: z.number().nonnegative(), // Consider tightening this based on format
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
export const GetAllSlotRequestSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
export const GetAllSlotByMentorBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

export const GetAllSlotByMentorPathSchema = z.object({
  mentorId: ObjectIdSchema,
});
