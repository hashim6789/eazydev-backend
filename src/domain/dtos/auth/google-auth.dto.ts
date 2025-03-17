import { SignupRole } from "../../types/user";

export interface IGoogleRequestDTO {
  googleToken: string;
  role: SignupRole;
}
