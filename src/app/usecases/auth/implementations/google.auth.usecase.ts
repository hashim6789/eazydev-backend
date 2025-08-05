import { ResponseDTO } from "../../../../domain/dtos/response";
import { UserEntity } from "../../../../domain/entities/user";
import { UserErrorType } from "../../../../domain/enums/user";
import { IUsersRepository } from "../../../../infra/repositories";
import { IGoogleLoginUseCase } from "../interfaces/google-login.usecase";
import axios from "axios";
import {
  IGoogleLoginRequestDTO,
  IUserOutRequestDTO,
  IUserValidDTO,
} from "../../../../domain/dtos";
import { SignupRole } from "../../../../domain/types/user";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IGenerateTokenProvider } from "../../../../infra/providers";

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
    private _userRepository: IUsersRepository,
    private _generateTokenProvider: IGenerateTokenProvider
  ) {}

  private async getGoogleUserData(token: string): Promise<GoogleApiResponse> {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );
    return response.data;
  }

  private _handleUnverifiedOrBlockedUserRole(
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
    }
    return null;
  }

  async execute({
    googleToken,
    role,
  }: IGoogleLoginRequestDTO): Promise<ResponseDTO> {
    //console.log("usecase");
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

      const fetchedUser = (await this._userRepository.findByEmail(
        data.email
      )) as IUserValidDTO | null;

      let user: null | IUserOutRequestDTO = null;
      if (!fetchedUser) {
        user = await this._userRepository.create({
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
          this._handleUnverifiedOrBlockedUserRole(fetchedUser, role);

        if (unverifiedOrBlockedResponse) {
          return unverifiedOrBlockedResponse;
        }

        if (!fetchedUser.googleId) {
          user = await this._userRepository.update(fetchedUser.id, {
            googleId: userEntity.googleId,
            profilePicture: userEntity.profilePicture,
            isVerified: true,
          });
        } else {
          user = await this._userRepository.update(fetchedUser.id, {
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

      if (!user) {
        return { data: { error: UserErrorType.UserCantCreate }, success: true };
      }

      const accessToken = await this._generateTokenProvider.generateToken(
        user.id,
        {
          userId: user.id,
          role: user.role,
        },
        "access"
      );
      const refreshToken = await this._generateTokenProvider.generateToken(
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
