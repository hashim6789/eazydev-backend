import { ResponseDTO } from "../../../../domain/dtos/response";
import { ISignupRequestDTO } from "../../../../domain/dtos/auth";
import { UserEntity } from "../../../../domain/entities/user";
import { UserErrorType } from "../../../../domain/enums/user";
import {
  ITokenRepository,
  IUsersRepository,
  IOtpRepository,
} from "../../../../infra/repositories";

import { IUserInRequestDTO } from "../../../../domain/dtos";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateOtpProvider,
  IGenerateTokenProvider,
  IPasswordHasher,
  ISendMailProvider,
} from "../../../../infra/providers";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}

export class SignupUseCase implements ISignupUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private generateTokenProvider: IGenerateTokenProvider,
    private otpRepository: IOtpRepository,
    private generateOtpProvider: IGenerateOtpProvider,
    private sendMailProvider: ISendMailProvider
  ) {}

  async execute({
    firstName,
    lastName,
    email,
    role,
    password,
  }: ISignupRequestDTO): Promise<ResponseDTO> {
    try {
      const userEntity = UserEntity.create({
        email,
        firstName,
        lastName,
        role,
        password,
        googleId: "",
        profilePicture: "",
      });

      const userAlreadyExists = (await this.userRepository.findByEmail(
        userEntity.email.address
      )) as IUserInRequestDTO | null;

      if (userAlreadyExists && userAlreadyExists.role !== role) {
        return {
          data: { error: UserErrorType.UserInvalidRole },
          success: false,
        };
      }
      if (userAlreadyExists && userAlreadyExists.isVerified) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        };
      }

      if (userAlreadyExists && !userAlreadyExists.isVerified) {
        await this.userRepository.delete(userAlreadyExists.id);
      }

      const passwordHashed = await this.passwordHasher.hash(password);
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        role: userEntity.role,
        password: passwordHashed,
        googleId: userEntity.googleId,
        profilePicture: userEntity.profilePicture,
      });

      const otp = await this.generateOtpProvider.generateOtp();
      console.log("otp =", otp);

      const hashedOtp = await this.passwordHasher.hash(otp);

      const otpDoc = await this.otpRepository.create(user.id, hashedOtp);
      await this.sendMailProvider.sendOtpMail(user.email, otp);

      const accessToken = await this.generateTokenProvider.generateToken(
        user.id,
        {
          userId: user.id,
          role: user.role,
        },
        "access"
      );
      const refreshToken = await this.generateTokenProvider.generateToken(
        user.id,
        {
          userId: user.id,
          role: user.role,
        },
        "refresh"
      );

      const outUser = UserEntity.convert(user);

      return {
        data: { refreshToken, accessToken, user: outUser },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
