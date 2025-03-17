import { SignupRole } from "../../types/user";

export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  password: string;
  role: SignupRole;
  email: string;
  googleId: string;
  profilePicture: string;
}
