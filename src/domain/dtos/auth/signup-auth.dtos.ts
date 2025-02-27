import { Role } from "../role.dtos";

export interface ISignupRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  email: string;
}
