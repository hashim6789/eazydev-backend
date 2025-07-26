import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUsersRepository } from "../../../repositories/user.repository";
import { IPasswordHasher } from "../../../providers/password-hasher.provider";
import { ILoginRequestDTO } from "../../../../domain/dtos/auth/login-auth.dto";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IGenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { ITokenRepository } from "../../../repositories/token.repository";
import { IUserValidDTO } from "../../../../domain/dtos";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export interface ILoginUseCase {
  execute(data: ILoginRequestDTO): Promise<ResponseDTO>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
    private generateTokenProvider: IGenerateTokenProvider,
    private tokenRepository: ITokenRepository
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

      const token = await this.generateTokenProvider.generateToken(user.id, {
        userId: user.id,
        role: user.role,
      });
      const tokenFounded = (await this.tokenRepository.findByUserIdAndType(
        user.id,
        "refresh"
      )) as TokenDTO | null;

      if (tokenFounded) {
        await this.tokenRepository.delete(user.id);
      }

      const refreshToken = await this.tokenRepository.create(
        user.id,
        user.role,
        "refresh"
      );

      // const outUser = UserEntity.convert({
      //   email: user.email,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   profilePicture: user.profilePicture,
      //   role: user.role,
      // });

      return {
        data: { token, refreshTokenId: refreshToken.id, user },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
