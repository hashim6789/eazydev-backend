import { SignupRole } from "../role.dtos";

export interface IGoogleRequestDTO {
  googleToken: string;
  role: SignupRole;
}
