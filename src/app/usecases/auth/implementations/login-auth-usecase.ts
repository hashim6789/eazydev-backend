import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { UserEntity } from "../../../../domain/entities/user.entity";
import { ILoginRequestDTO } from "../../../../domain/dtos/auth/login-auth.dto";
import { IUserInRequestDTO } from "../../../../domain/dtos/user";
import { AuthenticateUserErrorType } from "../../../../domain/enums/Authenticate/error-type.enum";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";

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

  async execute({ email, password }: ILoginRequestDTO): Promise<ResponseDTO> {
    try {
      const user = (await this.userRepository.findByEmail(
        email
      )) as IUserInRequestDTO | null;

      if (!user) {
        return {
          data: { error: AuthenticateUserErrorType.EmailOrPasswordWrong },
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

      const refreshToken = await this.refreshTokenRepository.create(user.id);

      return { data: { token, refreshToken, user }, success: true };

      return { data: user, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
