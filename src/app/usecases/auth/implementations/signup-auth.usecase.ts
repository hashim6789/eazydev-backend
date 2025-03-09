import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { ISignupRequestDTO } from "../../../../domain/dtos/auth";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { UserErrorType } from "../../../../domain/enums/user/error-type.enum";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { IGenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { ISendMailProvider } from "../../../providers/send-mail.provider";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}

export class SignupUseCase implements ISignupUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private refreshTokenRepository: IRefreshTokenRepository,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
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

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address
      );

      if (userAlreadyExists) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        };
      }

      const passwordHashed = await this.passwordHasher.hashPassword(password);
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        role: userEntity.role,
        password: passwordHashed,
        googleId: userEntity.googleId,
        profilePicture: userEntity.profilePicture,
      });

      const otp = await this.otpRepository.create(
        user.id,
        await this.generateOtpProvider.generateOtp()
      );
      await this.sendMailProvider.sendOtpMail(user.email, otp.otp);

      const token = await this.generateRefreshTokenProvider.generateToken(
        user.id
      );

      const newRefreshToken = await this.refreshTokenRepository.create(
        user.id,
        user.role
      );

      const outUser = UserEntity.convert(user);

      return {
        data: { refreshTokenId: newRefreshToken.id, token, user: outUser },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
