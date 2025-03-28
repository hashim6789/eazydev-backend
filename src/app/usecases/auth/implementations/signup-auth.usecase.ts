import { ResponseDTO } from "../../../../domain/dtos/response";
import { ISignupRequestDTO } from "../../../../domain/dtos/auth";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user";
import { UserErrorType } from "../../../../domain/enums/user";
import { IGenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IOtpRepository } from "../../../repositories/otp.repository";
import { IGenerateOtpProvider } from "../../../providers/generate-otp.provider";
import { ISendMailProvider } from "../../../providers/send-mail.provider";
import { ITokenRepository } from "../../../repositories";
import { IUserInRequestDTO } from "../../../../domain/dtos";

export interface ISignupUseCase {
  execute(data: ISignupRequestDTO): Promise<ResponseDTO>;
}

export class SignupUseCase implements ISignupUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private tokenRepository: ITokenRepository,
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

      const token = await this.generateTokenProvider.generateToken(user.id, {
        userId: user.id,
        role: user.role,
      });

      const newToken = await this.tokenRepository.create(
        user.id,
        user.role,
        "refresh"
      );

      const outUser = UserEntity.convert(user);

      return {
        data: { refreshTokenId: newToken.id, token, user: outUser },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
