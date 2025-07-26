import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { IResendOtpUseCase } from "../interfaces/resend-otp-usecase";
import { IResendOtpRequestDTO } from "../../../../domain/dtos/auth/resend-otp-auth.dto";
import { IUserDetailOutDTO } from "../../../../domain/dtos";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateOtpProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../../infra/providers";

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private otpRepository: IOtpRepository,
    private passwordHasher: IPasswordHasher,
    private generateOtpProvider: IGenerateOtpProvider,
    private sendMailProvider: ISendMailProvider
  ) {}

  async execute({ userId }: IResendOtpRequestDTO): Promise<ResponseDTO> {
    try {
      const deleteExistingOtp = await this.otpRepository.delete(userId);

      const user = (await this.userRepository.findById(
        userId
      )) as IUserDetailOutDTO;

      const otp = await this.generateOtpProvider.generateOtp();
      console.log("otp =", otp);

      const hashedOtp = await this.passwordHasher.hash(otp);

      const otpDoc = await this.otpRepository.create(userId, hashedOtp);
      await this.sendMailProvider.sendOtpMail(user.email, otp);

      return {
        statusCode: 201,
        success: true,
        data: {
          role: user.role,
        },
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
