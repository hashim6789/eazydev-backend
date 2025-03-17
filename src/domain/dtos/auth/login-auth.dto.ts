import { Role } from "../../types/user";

export interface ILoginRequestDTO {
  password: string;
  email: string;
  role: Role;
}
