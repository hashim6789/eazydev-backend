import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { IResendOtpUseCase } from "../resend-otp-usecase";
import { IResendOtpRequestDTO } from "../../../../domain/dtos/auth/resend-otp-auth.dto";
import { IGenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { ISendMailProvider } from "../../../providers/send-mail.provider";
import { IUserDetailOutDTO } from "../../../../domain/dtos/user/user.dto";

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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
