import { Role, SignupRole } from "../types";

export interface IForgotPasswordRequestDTO {
  email: string;
  role: Role;
}

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
export interface IGetPersonalInfoRequestDTO {
  userId: string;
  role: Role;
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
  sort: "ASC" | "DEC";
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
// & PurchasedCourse
