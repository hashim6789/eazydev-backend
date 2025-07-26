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
    private generateTokenProvider: IGenerateTokenProvider,
    private refreshTokenRepository: ITokenRepository,
    private tokenManager: ITokenManagerProvider
  ) {}

  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {ITokenUserDTO} tokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({ tokenId }: ITokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = (await this.refreshTokenRepository.findById(
        tokenId
      )) as TokenDTO | null;

      if (!refreshToken) {
        return {
          data: { error: AuthenticateUserErrorType.TokenInvalid },
          success: false,
        };
      }

      const refreshTokenExpired = this.tokenManager.validateTokenAge(
        refreshToken.expiresIn
      );
      const token = await this.generateTokenProvider.generateToken(
        refreshToken.userId,
        { userId: refreshToken.userId, role: refreshToken.role }
      );

      if (refreshTokenExpired) {
        await this.refreshTokenRepository.delete(refreshToken.userId);
        const newToken = await this.refreshTokenRepository.create(
          refreshToken.userId,
          refreshToken.role,
          "refresh"
        );
        return {
          data: { refreshToken: newToken, token },
          success: true,
        };
      }

      return { data: { token }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
