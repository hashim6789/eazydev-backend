import { SignupRole } from "../../domain/dtos/role.dtos";
import { UserEntity } from "../../domain/entities/user.entity";

export interface ISendMailProvider {
  sendOtpMail(email: string, otp: string): Promise<boolean>;
  sendForgotPasswordMail(
    role: SignupRole,
    user: UserEntity,
    resetURL: string
  ): Promise<boolean>;
}
