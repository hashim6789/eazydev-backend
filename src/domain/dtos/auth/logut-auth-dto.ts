import { Role } from "../../types/user";

export interface ILogoutRequestDTO {
  role: Role;
  userId: string;
}
