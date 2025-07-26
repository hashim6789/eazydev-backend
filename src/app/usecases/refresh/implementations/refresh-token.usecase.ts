import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { ITokenUserDTO } from "../../../../domain/dtos/refresh";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { ITokenRepository } from "../../../../infra/repositories";
import { IRefreshTokenUserUseCase } from "../interfaces/refresh-token.usecas";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  IGenerateTokenProvider,
  ITokenManagerProvider,
} from "../../../../infra/providers";
import { Payload } from "../../../../domain/dtos";

/**
 * Use case for refreshing a user's authentication token.
 *
 * @class
 * @implements {ITokenUserUseCase}
 */
export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {
  /**
   * Creates an instance of TokenUserUseCase.
   *
   * @constructor
   * @param {IGenerateTokenProvider} generateTokenProvider - The refresh token generator provider.
   * @param {ITokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private generateTokenProvider: IGenerateTokenProvider
  ) // private refreshTokenRepository: ITokenRepository,
  // private tokenManager: ITokenManagerProvider
  {}

  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {ITokenUserDTO} tokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute(
    // { refreshToken }: ITokenUserDTO,
    { userId, role }: Payload
  ): Promise<ResponseDTO> {
    try {
      // if (!refreshToken) {
      //   return {
      //     data: { error: AuthenticateUserErrorType.TokenInvalid },
      //     success: false,
      //   };
      // }
      // const refreshToken = (await this.refreshTokenRepository.findById(
      //   tokenId
      // )) as TokenDTO | null;

      // const refreshTokenExpired = this.tokenManager.validateTokenAge(
      //   refreshToken.expiresIn
      // );
      // if (refreshTokenExpired) {
      //   await this.refreshTokenRepository.delete(refreshToken.userId);
      //   const newToken = await this.refreshTokenRepository.create(
      //     refreshToken.userId,
      //     refreshToken.role,
      //     "refresh"
      //   );
      //   return {
      //     data: { refreshToken: newToken, token },
      //     success: true,
      //   };
      // }
      const accessToken = await this.generateTokenProvider.generateToken(
        userId,
        { userId, role },
        "access"
      );
      const refreshToken = await this.generateTokenProvider.generateToken(
        userId,
        { userId, role },
        "refresh"
      );

      return { data: { accessToken, refreshToken }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
