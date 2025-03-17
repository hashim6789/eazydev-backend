import { SignupRole } from "../../types/user";

export interface ISignupRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: SignupRole;
  email: string;
}
