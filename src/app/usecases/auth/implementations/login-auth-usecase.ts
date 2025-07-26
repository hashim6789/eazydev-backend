import { ResponseDTO } from "../../../../domain/dtos/response";
import { ILoginRequestDTO } from "../../../../domain/dtos/auth/login-auth.dto";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IUsersRepository } from "../../../../infra/repositories";
import { IUserValidDTO } from "../../../../domain/dtos";
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
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private generateTokenProvider: IGenerateTokenProvider // private tokenRepository: ITokenRepository
  ) {}

  async execute({
    email,
    password,
    role,
  }: ILoginRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findByEmail(
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

      const isValidPassword = await this.passwordHasher.compare(
        password,
        user.password
      );
      if (!isValidPassword) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
        };
      }

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
      return {
        data: { accessToken, refreshToken, user },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
