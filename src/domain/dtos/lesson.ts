import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { MaterialType } from "../types";
import { RoleTypes } from "../enums";

export interface ILessonOutDTO {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: string[];
}
export interface ILessonOutPopulateDTO {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: {
    id: string;
    title: string;
    description: string;
    duration: number;
    type: MaterialType;
  }[];
}

export type ICreateLessonInDTO = Omit<ILessonOutDTO, "id">;

export type ICreateLessonRequestDTO = Omit<ILessonOutDTO, "id"> & {
  courseId: string;
};
export type IUpdateLessonRequestDTO = ILessonOutDTO & {
  courseId: string;
};

export const CreateLessonSchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["admin", "mentor"]),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  mentorId: ObjectIdSchema,
  courseId: ObjectIdSchema,
  materials: z.array(ObjectIdSchema),
});

export type CreateLessonDTO = z.infer<typeof CreateLessonSchema>;

//

export const GetLessonPathSchema = z.object({
  lessonId: ObjectIdSchema,
});

export const GetLessonBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
export const UpdateLessonPathSchema = z.object({
  lessonId: ObjectIdSchema,
});

export const UpdateLessonBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["admin", "mentor"]),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  mentorId: ObjectIdSchema,
  courseId: ObjectIdSchema,
  materials: z.array(ObjectIdSchema),
});
