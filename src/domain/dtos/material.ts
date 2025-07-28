import { MaterialType, Role } from "../types";
import { IUserDetailsDTO, ObjectIdSchema, zStringPositiveInteger } from ".";

export interface QueryMaterial {
  type: MaterialType | "all";
  search: string;
  page: string;
  limit: string;
  mentorId?: string;
}

export interface Material {
  id: string;
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
}

export type ICreateMaterialRequestDTO = Omit<
  Material,
  "id" | "createdAt" | "updatedAt"
>;
export type ICreateMaterialInDTO = Omit<ICreateMaterialRequestDTO, "lessonId">;

export type IMaterialOutDTO = Omit<Material, "createdAt" | "updatedAt">;

export type IUpdateMaterialRequestDTO = {
  materialId: string;
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
};
export type IUpdateMaterialInDTO = {
  title: string;
  mentorId: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
};

export interface IGetAllMaterialRequestDTO {
  query: QueryMaterial;
  userId: string;
  role: Role;
}
export interface IGetMaterialRequestDTO {
  materialId: string;
  userId: string;
  role: Role;
}

export type IMaterialPopulateMentorDTO = Omit<IMaterialOutDTO, "mentorId"> & {
  mentor: IUserDetailsDTO;
};

import { z } from "zod";
import { MaterialTypes, RoleTypes } from "../enums";

export const CreateMaterialBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["video", "reading"]),
  fileKey: z.string().min(1, "File key is required"),
  duration: z.number().min(5).max(60, "Duration must be between 5 and 60"),
  // lessonId: ObjectIdSchema.optional(), // include if needed
  // mentorId is derived from userId internally
});

//
export const GetAllMaterialsQuerySchema = z.object({
  type: z.nativeEnum(MaterialTypes),
  search: z.string(),
  page: zStringPositiveInteger("Page"),
  limit: zStringPositiveInteger("Limit"),
});

export const GetAllMaterialsBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
export const GetMaterialPathSchema = z.object({
  materialId: ObjectIdSchema,
});

export const GetMaterialBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

export const UpdateMaterialPathSchema = z.object({
  materialId: ObjectIdSchema,
});

export const UpdateMaterialBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["video", "reading"]),
  fileKey: z.string().min(1, "File key is required"),
  duration: z.number().min(5).max(60),
});
