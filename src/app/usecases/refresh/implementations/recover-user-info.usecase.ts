import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IRecoveryUserDTO } from "../../../../domain/dtos/refresh";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { IUserInRequestDTO } from "../../../../domain/dtos";
import { AuthMessages } from "../../../../domain/enums/auth";
import {
  ITokenRepository,
  IUsersRepository,
} from "../../../../infra/repositories";
import { IRecoverUserInformationUseCase } from "../interfaces/recover-user-info.usecase";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { ITokenManagerProvider } from "../../../../infra/providers";

/**
 * Use case for recovering user information based on a refresh token.
 *
 * @class
 * @implements {IRecoverUserInformationUseCase}
 */
export class RecoverUserInformationUserUseCase
  implements IRecoverUserInformationUseCase
{
  /**
   * Creates an instance of RecoverUserInformationUserUseCase.
   *
   * @constructor
   * @param {ITokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private refreshTokenRepository: ITokenRepository,
    private userRepository: IUsersRepository,
    private tokenManager: ITokenManagerProvider
  ) {}

  /**
   * Executes the recover user information use case.
   *
   * @async
   * @param {ITokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({ userId }: IRecoveryUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken =
        (await this.refreshTokenRepository.findByUserIdAndType(
          userId,
          "refresh"
        )) as TokenDTO | null;

      if (!refreshToken) {
        return {
          data: { error: AuthMessages.TokenInvalidOrExpired },
          success: false,
        };
      }

      const refreshTokenExpired = this.tokenManager.validateTokenAge(
        refreshToken.expiresIn
      );

      if (refreshTokenExpired) {
        return {
          data: { error: AuthMessages.TokenInvalidOrExpired },
          success: false,
        };
      }

      const user = (await this.userRepository.findById(
        refreshToken.userId
      )) as IUserInRequestDTO | null;

      return { data: user, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
