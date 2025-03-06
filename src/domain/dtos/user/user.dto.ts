import { Role } from "../role.dtos";

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

export type IUserOutRequestDTO = Pick<
  IUserDTO,
  "id" | "firstName" | "lastName" | "email" | "role" | "createdAt"
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
  "id" | "firstName" | "lastName" | "email" | "role" | "password" | "createdAt"
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
  >
>;
