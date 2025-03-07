import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authenticate/error-type.enum";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import {
  IUserInRequestDTO,
  IUserValidDTO,
} from "../../../../domain/dtos/user/user.dto";
import { IVerifyOtpUseCase } from "../verify-otp.usecase";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { OtpDTO } from "../../../../domain/dtos/auth/otp-auth-dto";
import { OtpErrorType } from "../../../../domain/enums/otp/error-type.enum";
import { UserErrorType } from "../../../../domain/enums/user/error-type.enum";
import { error } from "console";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private otpRepository: IOtpRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute({ otp, userId }: IVerifyOtpRequestDTO): Promise<ResponseDTO> {
    try {
      const existingOtp = (await this.otpRepository.findByUserId(
        userId
      )) as OtpDTO;
      if (!existingOtp) {
        return {
          statusCode: 404,
          success: false,
          data: { error: OtpErrorType.OtpDoesNotExist },
        };
      }

      if (existingOtp.expiresIn + 5 * 60 * 1000 > Date.now()) {
        return {
          statusCode: 400,
          success: false,
          data: { error: OtpErrorType.OtpExpired },
        };
      }

      if (!(await this.passwordHasher.comparePasswords(otp, existingOtp.otp))) {
        return {
          statusCode: 400,
          success: false,
          data: { error: OtpErrorType.OtpNotValid },
        };
      }

      const verifiedUser = await this.userRepository.update(userId, {
        isVerified: true,
      });

      if (!verifiedUser) {
        return {
          statusCode: 400,
          success: false,
          data: { error: UserErrorType.UserCantUpdate },
        };
      }

      return {
        statusCode: 200,
        success: true,
        data: { error: OtpErrorType.OtpVerifySuccess },
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
