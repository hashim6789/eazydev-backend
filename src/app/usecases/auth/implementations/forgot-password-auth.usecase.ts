import { ResponseDTO } from "../../../../domain/dtos/response";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IUserValidDTO } from "../../../../domain/dtos";
import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IForgotPasswordUseCase } from "../interfaces";
import { IForgotPasswordRequestDTO } from "../../../../domain/dtos";
import { SignupRole } from "../../../../domain/types";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { ISendMailProvider } from "../../../../infra/providers";
import {
  ITokenRepository,
  IUsersRepository,
} from "../../../../infra/repositories";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private _userRepository: IUsersRepository,
    private _tokenRepository: ITokenRepository,
    private _sendMailProvider: ISendMailProvider
  ) {}

  async execute({
    email,
    role,
  }: IForgotPasswordRequestDTO): Promise<ResponseDTO> {
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

      const tokenFounded = (await this._tokenRepository.findByUserIdAndType(
        user.id,
        "reset"
      )) as TokenDTO | null;

      if (tokenFounded) {
        await this._tokenRepository.delete(user.id);
      }

      const resetToken = await this._tokenRepository.create(
        user.id,
        user.role,
        "reset"
      );

      await this._sendMailProvider.sendForgotPasswordMail(
        user.role as SignupRole,
        user,
        resetToken.id
      );

      return {
        data: { tokenId: resetToken.id },
        success: true,
      };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
