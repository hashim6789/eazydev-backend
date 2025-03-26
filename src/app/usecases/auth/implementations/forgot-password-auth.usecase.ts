import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUsersRepository } from "../../../repositories/user.repository";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { ITokenRepository } from "../../../repositories/token.repository";
import { IUserValidDTO } from "../../../../domain/dtos";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IForgotPasswordUseCase } from "../interfaces";
import { IForgotPasswordRequestDTO } from "../../../../domain/dtos";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({
    email,
    role,
  }: IForgotPasswordRequestDTO): Promise<ResponseDTO> {
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

      const tokenFounded = (await this.tokenRepository.findByUserIdAndType(
        user.id,
        "reset"
      )) as TokenDTO | null;

      if (tokenFounded) {
        await this.tokenRepository.delete(user.id);
      }

      const refreshToken = await this.tokenRepository.create(
        user.id,
        user.role,
        "reset"
      );

      return {
        data: { tokenId: refreshToken.id, user },
        success: true,
      };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
