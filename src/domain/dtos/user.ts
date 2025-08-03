import { z } from "zod";
import { Role, SignupRole } from "../types";
import { ObjectIdSchema, zStringPositiveInteger } from "./common";
import { RoleTypes, UserSorts, UserStatuses } from "../enums";

export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: SignupRole;
  email: string;
  googleId: string;
  profilePicture: string;
}

export interface IGetUserRequestDTO {
  userId: string;
  role: SignupRole;
}
export interface IGetUserDataRequestDTO {
  id: string;
  userRole: SignupRole;
}
export interface IGetPersonalInfoRequestDTO {
  userId: string;
  role: Role;
}
export interface IUpdatePersonalInfoRequestDTO {
  firstName: string;
  lastName: string;
}
export interface IUpdateProfilePictureRequestDTO {
  profilePicture: string;
}
export interface IVerifyPasswordRequestDTO {
  currentPassword: string;
}
export interface IChangePasswordRequestDTO {
  newPassword: string;
}
export interface BlockUserRequestDTO {
  userId: string;
  change: boolean;
}

export interface QueryUser {
  role: Role;
  status: "blocked" | "unblocked" | "all";
  search: string;
  page: string;
  // sort: "ASC" | "DEC";
  limit: string;
}

export interface IUserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  isVerified: boolean;
  profilePicture: string;
  role: Role;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserDetailsDTO = Pick<
  IUserDTO,
  "firstName" | "lastName" | "profilePicture" | "id"
>;

export type IUserOutRequestDTO = Pick<
  IUserDTO,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "profilePicture"
  | "isBlocked"
  | "isVerified"
>;

export type IUserValidDTO = Pick<
  IUserDTO,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "isBlocked"
  | "isVerified"
  | "password"
  | "createdAt"
  | "googleId"
  | "profilePicture"
>;
export type IUserInRequestDTO = Pick<
  IUserDTO,
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "password"
  | "createdAt"
  | "isVerified"
>;
export type IUpdateUserRequestDTO = Partial<
  Pick<
    IUserDTO,
    | "id"
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "googleId"
    | "profilePicture"
    | "isVerified"
    | "isBlocked"
  >
>;

export interface IUserOut {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  role: Role;
  isVerified: boolean;
  isBlocked: boolean;
}

export type IUserDetailOutDTO = IUserOut;

export interface UserDataDTO {
  firstName: string;
  lastName: string | null;
  email: string;
  profilePicture: string | null;
  courses: { title: string; thumbnail: string; price: string }[];
  isBlocked: boolean | null;
}

//
export const BlockUserBodySchema = z.object({
  change: z.boolean(),
});

export const BlockUserPathSchema = z.object({
  userId: ObjectIdSchema,
});

//
export const ChangePasswordRequestSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

//

// Optional: z.enum([...]) if roles/status are predefined
export const GetAllUserQuerySchema = z.object({
  role: z.nativeEnum(RoleTypes),
  // sort: z.nativeEnum(UserSorts),
  status: z.nativeEnum(UserStatuses),
  search: z.string(),
  page: zStringPositiveInteger("Page"),
  limit: zStringPositiveInteger("Limit"),
});

//

export const GetPersonalInfoSchema = z.object({
  userId: ObjectIdSchema,
  role: z.nativeEnum(RoleTypes),
});

//

export const GetUserPathSchema = z.object({
  id: ObjectIdSchema,
});

export const GetUserQuerySchema = z.object({
  userRole: z.enum(["learner", "mentor"]),
});

//
export const UpdatePersonalInfoBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["learner", "mentor"]),
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
});

//
export const UpdateProfilePictureBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["learner", "mentor"]),
  profilePicture: z.string().url("profilePicture must be a valid URL"),
});

//
export const VerifyPasswordBodySchema = z.object({
  userId: ObjectIdSchema,
  role: z.enum(["learner", "mentor"]),
  currentPassword: z
    .string()
    .min(8, "currentPassword must be at least 6 characters"),
});
