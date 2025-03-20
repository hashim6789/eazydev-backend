import { Role, SignupRole } from "../../types/user";

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
