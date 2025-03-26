import { TokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { ITokenUserDTO } from "../../../../domain/dtos/refresh";
import { ResponseDTO } from "../../../../domain/dtos/response";
import { AuthenticateUserErrorType } from "../../../../domain/enums/auth";
import { IGenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { ITokenManagerProvider } from "../../../providers/token-manager.provider";
import { ITokenRepository } from "../../../repositories/token.repository";
import { IRefreshTokenUserUseCase } from "../interfaces/refresh-token.usecas";

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
   * @param {ITokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({ refreshTokenId }: ITokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = (await this.refreshTokenRepository.findById(
        refreshTokenId
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
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
