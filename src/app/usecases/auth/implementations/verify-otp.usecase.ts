import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IVerifyOtpUseCase } from "../interfaces/verify-otp.usecase";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { OtpDTO } from "../../../../domain/dtos/auth/otp-auth-dto";
import { OtpErrorType } from "../../../../domain/enums/otp";
import { UserErrorType } from "../../../../domain/enums/user";
import { IVerifyOtpRequestDTO } from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { UserEntity } from "../../../../domain/entities/user";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPasswordHasher } from "../../../../infra/providers";

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

      if (!(await this.passwordHasher.compare(otp, existingOtp.otp))) {
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

      const user = UserEntity.convert(verifiedUser);

      return {
        statusCode: 200,
        success: true,
        data: {
          user,
        },
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
