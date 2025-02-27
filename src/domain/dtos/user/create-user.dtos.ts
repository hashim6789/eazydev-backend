import { Role } from "../role.dtos";

export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  email: string;
}
