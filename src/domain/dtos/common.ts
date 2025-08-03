import { z } from "zod";
import { ObjectId } from "mongodb";
import { CommonErrorMessages, RoleTypes } from "../enums";

const { INVALID_OBJECTID } = CommonErrorMessages;

export const ObjectIdSchema = z.string().refine(ObjectId.isValid, {
  message: INVALID_OBJECTID,
});

export const zStringPositiveInteger = (fieldName = "Field") =>
  z.string().refine((val) => /^\d+$/.test(val) && Number(val) > 0, {
    message: `${fieldName} must be a positive numeric string`,
  });

export const RoleSchema = z.object({
  role: z.enum(["admin", "mentor", "learner"]).default("learner"),
});

export type RolePayload = z.infer<typeof RoleSchema>;

export const PaginationSchema = z.object({
  page: z.string().regex(/^\d+$/, "Page must be a number"), // or use z.coerce.number()
  limit: z.string().regex(/^\d+$/, "Limit must be a number"), // if coming as string from query
});

export type SimplePagination = z.infer<typeof PaginationSchema>;

export interface PaginationDTO {
  body: unknown[];
  total: number;
  page: number;
  last_page: number;
}
