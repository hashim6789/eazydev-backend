import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IOtpRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { IResendOtpUseCase } from "../interfaces/resend-otp-usecase";
import { IResendOtpRequestDTO } from "../../../../domain/dtos/auth/resend-otp-auth.dto";
import { IUserDetailOutDTO } from "../../../../domain/dtos";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateOtpProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../../infra/providers";
import dayjs from "dayjs";
import { mapOtpToDocument } from "../../../../infra/databases/mappers";

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
      await this.otpRepository.delete({ userId });

      const user = (await this.userRepository.findById(
        userId
      )) as IUserDetailOutDTO;

      const otp = await this.generateOtpProvider.generateOtp();
      console.log("otp =", otp);
      const expiresIn = dayjs().add(5, "minute").unix();

      const hashedOtp = await this.passwordHasher.hash(otp);
      const mappedDocument = mapOtpToDocument({
        userId,
        otp: hashedOtp,
        expiresIn,
      });

      await this.otpRepository.create(mappedDocument);
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
