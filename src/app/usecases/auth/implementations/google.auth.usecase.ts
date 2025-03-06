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
import { ISignupUseCase } from "../signup-auth.usecase";
import { IGoogleRequestDTO } from "../../../../domain/dtos/auth/google-auth.dto";
import { IGoogleLoginUseCase } from "../google-login.usecase";
import axios from "axios";
import {
  IUserOutRequestDTO,
  IUserValidDTO,
} from "../../../../domain/dtos/user/user.dto";

interface GoogleApiResponse {
  email: string;
  email_verified: boolean;
  picture: string;
  given_name: string;
  family_name: string;
  sub: string;
}

export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private refreshTokenRepository: IRefreshTokenRepository,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider
  ) {}

  private async getGoogleUserData(token: string): Promise<GoogleApiResponse> {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    return response.data;
  }

  private handleUnverifiedOrBlockedUser(
    fetchedUser: IUserValidDTO
  ): ResponseDTO | null {
    if (fetchedUser.isBlocked) {
      return {
        data: { error: UserErrorType.UserBlocked },
        success: false,
      };
    } else if (!fetchedUser.isVerified) {
      return {
        data: { error: UserErrorType.UserNotVerified },
        success: false,
      };
    }
    return null;
  }

  async execute({
    googleToken,
    role,
  }: IGoogleRequestDTO): Promise<ResponseDTO> {
    try {
      const data = await this.getGoogleUserData(googleToken);
      const userEntity = UserEntity.create({
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
        role,
        password: "",
        googleId: data.sub,
        profilePicture: data.picture,
      });

      const fetchedUser = (await this.userRepository.findByEmail(
        data.email
      )) as IUserValidDTO | null;

      let user: null | IUserOutRequestDTO = null;
      if (!fetchedUser) {
        user = await this.userRepository.create({
          email: userEntity.email.address,
          firstName: userEntity.firstName,
          lastName: userEntity.lastName,
          role: userEntity.role,
          password: userEntity.password,
          googleId: userEntity.googleId,
          profilePicture: userEntity.profilePicture,
        });
      } else {
        const unverifiedOrBlockedResponse =
          this.handleUnverifiedOrBlockedUser(fetchedUser);
        if (unverifiedOrBlockedResponse) {
          return unverifiedOrBlockedResponse;
        }

        if (!fetchedUser.googleId) {
          user = await this.userRepository.update(fetchedUser, {
            googleId: userEntity.googleId,
            profilePicture: userEntity.profilePicture,
          });
        } else {
          user = await this.userRepository.update(fetchedUser, {
            email: userEntity.email.address,
            firstName: userEntity.firstName,
            lastName: userEntity.lastName,
            password: userEntity.password,
            googleId: userEntity.googleId,
            profilePicture: userEntity.profilePicture,
          });
        }
      }

      // const passwordHashed = await this.passwordHasher.hashPassword(password);
      // const user = await this.userRepository.create({
      //   email: userEntity.email.address,
      //   firstName: userEntity.firstName,
      //   lastName: userEntity.lastName,
      //   role: userEntity.role,
      //   password: passwordHashed,
      // });

      // const otp = await this.otpRepository.create(
      //   user.id,
      //   await this.generateOtpProvider.generateOtp()
      // );
      // await this.sendMailProvider.sendOtpMail(user.email, otp.otp);

      if (!user) {
        return { data: { error: UserErrorType.UserCantCreate }, success: true };
      }

      const token = await this.generateRefreshTokenProvider.generateToken(
        user.id
      );

      const newRefreshToken = await this.refreshTokenRepository.create(
        user.id,
        user.role
      );

      return { data: { refreshToken: newRefreshToken, token }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
