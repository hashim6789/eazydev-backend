import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  IOtpRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { IResendOtpUseCase } from "../interfaces/resend-otp-usecase";
import {
  IResendOtpRequestDTO,
  IUserDetailOutDTO,
} from "../../../../domain/dtos";
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
    private _userRepository: IUsersRepository,
    private _otpRepository: IOtpRepository,
    private _passwordHasher: IPasswordHasher,
    private _generateOtpProvider: IGenerateOtpProvider,
    private _sendMailProvider: ISendMailProvider
  ) {}

  async execute({ userId }: IResendOtpRequestDTO): Promise<ResponseDTO> {
    try {
      await this._otpRepository.delete({ userId });

      const user = (await this._userRepository.findById(
        userId
      )) as IUserDetailOutDTO;

      const otp = await this._generateOtpProvider.generateOtp();
      //console.log("otp =", otp);
      const expiresIn = dayjs().add(5, "minute").unix();

      const hashedOtp = await this._passwordHasher.hash(otp);
      const mappedDocument = mapOtpToDocument({
        userId,
        otp: hashedOtp,
        expiresIn,
      });

      await this._otpRepository.create(mappedDocument);
      await this._sendMailProvider.sendOtpMail(user.email, otp);

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
