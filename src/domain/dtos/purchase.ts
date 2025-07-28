import { z } from "zod";
import { ObjectIdSchema } from "./common";
import { RoleTypes } from "../enums";
export interface IPurchaseOutDTO {
  id: string;
  purchaseId: string;
  learnerId: string;
  courseId: string;
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}
export interface IPurchaseOutPopulatedDTO {
  id: string;
  purchaseId: string;
  learnerId: string;
  course: {
    id: string;
    title: string;
  };
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}

export type ICreatePurchaseInDTO = Omit<IPurchaseOutDTO, "id">;
export type ICreatePurchaseRequestDTO = {
  learnerId: string;
  amount: number;
  paymentIntentId: string;
  courseId: string;
};
export type IGetPurchaseRequestDTO = { id: string };
export type IGetAllPurchaseRequestDTO = Pick<ICreatePurchaseInDTO, "learnerId">;

//
export const CreatePaymentIntentSchema = z.object({
  courseId: ObjectIdSchema,
});

//
export const CreatePurchaseBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  learnerId: ObjectIdSchema,
  amount: z.number().positive(),
  paymentIntentId: z.string().min(1),
  courseId: ObjectIdSchema,
});

//
export const GetAllPurchasesBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
export const GetPurchasePathSchema = z.object({
  id: ObjectIdSchema,
});

export const GetPurchaseBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//
