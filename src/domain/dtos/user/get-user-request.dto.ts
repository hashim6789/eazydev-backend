import { SignupRole } from "../role.dtos";

export interface GetUserRequestDTO {
  userId: string;
  role: SignupRole;
}
export interface BlockUserRequestDTO {
  userId: string;
  change: boolean;
}
