import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { ILoginRequestDTO } from "../../../../domain/dtos/auth/login-auth.dto";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authenticate/error-type.enum";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import {
  IUserInRequestDTO,
  IUserValidDTO,
} from "../../../../domain/dtos/user/user.dto";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository
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

      const isValidPassword = await this.passwordHasher.comparePasswords(
        password,
        user.password
      );
      if (!isValidPassword) {
        return {
          success: false,
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
        };
      }

      const token = await this.generateRefreshTokenProvider.generateToken(
        user.id
      );
      const refreshTokenFounded =
        await this.refreshTokenRepository.findByUserId(user.id);

      if (refreshTokenFounded) {
        await this.refreshTokenRepository.delete(user.id);
      }

      const refreshToken = await this.refreshTokenRepository.create(
        user.id,
        user.role
      );

      return { data: { token, refreshToken, user }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
