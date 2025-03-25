import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUsersRepository } from "../../../repositories/user.repository";
import { UserEntity } from "../../../../domain/entities/user";
import { UserErrorType } from "../../../../domain/enums/user";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IGoogleRequestDTO } from "../../../../domain/dtos/auth/google-auth.dto";
import { IGoogleLoginUseCase } from "../interfaces/google-login.usecase";
import axios from "axios";
import {
  IUserOutRequestDTO,
  IUserValidDTO,
} from "../../../../domain/dtos/user/user.dto";
import { SignupRole } from "../../../../domain/types/user";

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

  private handleUnverifiedOrBlockedUserRole(
    fetchedUser: IUserValidDTO,
    role: SignupRole
  ): ResponseDTO | null {
    if (fetchedUser.isBlocked) {
      return {
        data: { error: UserErrorType.UserBlocked },
        success: false,
      };
    } else if (fetchedUser.role !== role) {
      return {
        data: { error: UserErrorType.UserInvalidRole },
        success: false,
      };

      // } else if (!fetchedUser.isVerified) {
      //   return {
      //     data: { error: UserErrorType.UserNotVerified },
      //     success: false,
      //   };
    }
    return null;
  }

  async execute({
    googleToken,
    role,
  }: IGoogleRequestDTO): Promise<ResponseDTO> {
    console.log("usecase");
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
          this.handleUnverifiedOrBlockedUserRole(fetchedUser, role);

        if (unverifiedOrBlockedResponse) {
          return unverifiedOrBlockedResponse;
        }

        if (!fetchedUser.googleId) {
          user = await this.userRepository.update(fetchedUser.id, {
            googleId: userEntity.googleId,
            profilePicture: userEntity.profilePicture,
            isVerified: true,
          });
        } else {
          user = await this.userRepository.update(fetchedUser.id, {
            email: userEntity.email.address,
            firstName: userEntity.firstName,
            lastName: userEntity.lastName,
            isVerified: true,
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
        user.id,
        { userId: user.id, role: user.role }
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
      console.log(error);
      return { data: { error: error.message }, success: false };
    }
  }
}
