import { ResponseDTO } from "../../../../domain/dtos/response";
import {
  ITokenRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IGetResetPageUseCase, IResetPasswordUseCase } from "../interfaces";
import {
  IGetResetPageRequestDTO,
  IResetPasswordRequestDTO,
} from "../../../../domain/dtos/auth/vefiry-otp-auth.dto";
import { TokenErrorType } from "../../../../domain/enums/token";
import { IUserValidDTO } from "../../../../domain/dtos";
import { UserErrorType } from "../../../../domain/enums";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IPasswordHasher } from "../../../../infra/providers";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute({
    tokenId,
    role,
    password,
  }: IResetPasswordRequestDTO): Promise<ResponseDTO> {
    try {
      const resetToken = (await this.tokenRepository.findById(
        tokenId
      )) as TokenDTO | null;
      if (!resetToken) {
        return {
          data: { error: TokenErrorType.TokenNotFound },
          success: false,
        };
      }
      if (
        resetToken.type !== "reset" ||
        resetToken.role !== role
        // || resetToken.expiresIn < Date.now()
      ) {
        return {
          data: { error: TokenErrorType.TokenIsNotValid },
          success: false,
        };
      }

      const user = (await this.userRepository.findById(
        resetToken.userId
      )) as IUserValidDTO | null;
      if (!user) {
        return {
          data: { error: UserErrorType.UserNotFound },
          success: false,
        };
      }

      const hashedPassword = await this.passwordHasher.hash(password);
      const updatedUser = await this.userRepository.update(user.id, {
        password: hashedPassword,
      });
      if (!updatedUser) {
        return {
          data: { error: UserErrorType.UserCantUpdate },
          success: false,
        };
      }

      await this.tokenRepository.deleteById(tokenId);

      return {
        data: { tokenId },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
