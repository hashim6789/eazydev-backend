import { ResponseDTO } from "../../../../domain/dtos/response";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IUsersRepository } from "../../../../infra/repositories";
import { ILoginRequestDTO, IUserValidDTO } from "../../../../domain/dtos";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateTokenProvider,
  IPasswordHasher,
} from "../../../../infra/providers";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private _userRepository: IUsersRepository,
    private _passwordHasher: IPasswordHasher,
    private _generateTokenProvider: IGenerateTokenProvider // private _tokenRepository: ITokenRepository
  ) {}

  async execute({
    email,
    password,
    role,
  }: ILoginRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this._userRepository.findByEmail(
        email
      )) as IUserValidDTO | null;

      if (!user) {
        return {
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
          success: false,
        };
      }

      if (user.isBlocked || !user.isVerified || user.role !== role) {
        return {
          data: { error: AuthenticateUserErrorType.UserNotVerifiedOrBlocked },
          success: false,
        };
      }

      const isValidPassword = await this._passwordHasher.compare(
        password,
        user.password
      );
      if (!isValidPassword) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
        };
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
      return {
        data: { accessToken, refreshToken, user },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
