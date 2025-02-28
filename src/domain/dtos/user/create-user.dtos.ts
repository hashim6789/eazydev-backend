import { SignupRole } from "../role.dtos";

export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: SignupRole;
  email: string;
}
