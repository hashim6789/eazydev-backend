import { SignupRole } from "../../types";

export interface IVerifyOtpRequestDTO {
  otp: string;
  userId: string;
}
export interface IGetResetPageRequestDTO {
  tokenId: string;
  role: SignupRole;
}
