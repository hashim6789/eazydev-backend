import { SignupRole } from "../../../domain/types/user";
import { IUserValidDTO } from "../../../domain/dtos";

export interface ISendMailProvider {
  sendOtpMail(email: string, otp: string): Promise<boolean>;
  sendForgotPasswordMail(
    role: SignupRole,
    user: IUserValidDTO,
    resetURL: string
  ): Promise<boolean>;
}
