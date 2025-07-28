import { Role } from "../types";
import { CategoryStatus } from "../types/category";

export interface ICategoryOutDTO {
  id: string;
  title: string;
  isListed: boolean;
}

export type ICreateCategoryInDTO = Omit<ICategoryOutDTO, "id">;
export type IUpdateCategoryIntDTO = Omit<ICategoryOutDTO, "id" | "isListed">;

export type ICreateCategoryRequestDTO = Omit<
  ICategoryOutDTO,
  "isListed" | "id"
> & {
  adminId: string;
};

export type IUpdateListCategoryRequestDTO = {
  categoryId: string;
  change: boolean;
  adminId: string;
};

export type IUpdateCategoryRequestDTO = {
  categoryId: string;
  title: string;
  adminId: string;
};

export interface QueryCategory {
  role: Role;
  search: string;
  page: string;
  limit: string;
  status: CategoryStatus | "all";
}

import { z } from "zod";
import { ObjectIdSchema, zStringPositiveInteger } from "./common";
import { RoleTypes, CategoryTypes } from "../enums";

const { ADMIN, MENTOR } = RoleTypes;
const { LISTED, UNLISTED, ALL } = CategoryTypes;

export const CreateCategorySchema = z.object({
  title: z.string().min(1),
  adminId: ObjectIdSchema,
  userId: ObjectIdSchema,
  role: z.enum([ADMIN]),
});

export type CreateCategoryPayload = z.infer<typeof CreateCategorySchema>;

export const CategoryQuerySchema = z.object({
  role: z.enum([ADMIN]),
  status: z.enum([LISTED, UNLISTED, ALL]),
  search: z.string(),
  page: zStringPositiveInteger("Page"),
  limit: zStringPositiveInteger("Limit"),
});

export type CategoryQuery = z.infer<typeof CategoryQuerySchema>;

export const UpdateCategoryBodySchema = z.object({
  title: z.string().min(1),
  adminId: ObjectIdSchema,
  userId: ObjectIdSchema,
  role: z.enum([ADMIN, MENTOR]), // tailor to your roles
});

export const UpdateCategoryPathSchema = z.object({
  categoryId: ObjectIdSchema,
});

export type UpdateCategoryBodyDTO = z.infer<typeof UpdateCategoryBodySchema>;
export type UpdateCategoryPathDTO = z.infer<typeof UpdateCategoryPathSchema>;

export const UpdateListCategorySchema = z.object({
  change: z.boolean(),
  adminId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(RoleTypes),
});

export const CategoryPathSchema = z.object({
  categoryId: z.string(),
});
