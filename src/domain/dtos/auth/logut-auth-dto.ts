import { Role } from "../role.dtos";

export interface ILogoutRequestDTO {
  role: Role;
  userId: string;
}
