import { SignupRole } from "../../domain/types/user";
import { UserEntity } from "../../domain/entities/user";

export interface ISendMailProvider {
  sendOtpMail(email: string, otp: string): Promise<boolean>;
  sendForgotPasswordMail(
    role: SignupRole,
    user: UserEntity,
    resetURL: string
  ): Promise<boolean>;
}
