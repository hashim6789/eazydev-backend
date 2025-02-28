import { Role } from "../role.dtos";

export interface ILoginRequestDTO {
  password: string;
  email: string;
  role: Role;
}
