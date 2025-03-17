import { SignupRole } from "../../types/user";

export interface GetUserRequestDTO {
  userId: string;
  role: SignupRole;
}
export interface BlockUserRequestDTO {
  userId: string;
  change: boolean;
}
