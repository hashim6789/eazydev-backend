import { SignupRole } from "../role.dtos";

export interface ISignupRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: SignupRole;
  email: string;
}
