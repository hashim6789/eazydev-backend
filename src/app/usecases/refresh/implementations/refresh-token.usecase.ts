import { RefreshTokenDTO } from "../../../../domain/dtos/auth/refresh-token-dto";
import { IRefreshTokenUserDTO } from "../../../../domain/dtos/refresh";
import { ResponseDTO } from "../../../../domain/dtos/response.dtos";
import { IGenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { ITokenManagerProvider } from "../../../providers/token-manager.provider";
import { IRefreshTokenRepository } from "../../../repositories/refresh-token.repository";
import { IRefreshTokenUserUseCase } from "../interfaces/refresh-token.usecas";

/**
 * Use case for refreshing a user's authentication token.
 *
 * @class
 * @implements {IRefreshTokenUserUseCase}
 */
export class RefreshTokenUserUseCase implements IRefreshTokenUserUseCase {
  /**
   * Creates an instance of RefreshTokenUserUseCase.
   *
   * @constructor
   * @param {IGenerateRefreshTokenProvider} generateRefreshTokenProvider - The refresh token generator provider.
   * @param {IRefreshTokenRepository} refreshTokenRepository - The repository for refresh tokens.
   * @param {ITokenManagerProvider} tokenManager - The token manager provider.
   */
  constructor(
    private generateRefreshTokenProvider: IGenerateRefreshTokenProvider,
    private refreshTokenRepository: IRefreshTokenRepository,
    private tokenManager: ITokenManagerProvider
  ) {}

  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {IRefreshTokenUserDTO} refreshTokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    refreshTokenId,
  }: IRefreshTokenUserDTO): Promise<ResponseDTO> {
    try {
      const refreshToken = (await this.refreshTokenRepository.findById(
        refreshTokenId
      )) as RefreshTokenDTO | null;

      if (!refreshToken) {
        return { data: { error: "Refresh token is invalid." }, success: false };
      }

      const refreshTokenExpired = this.tokenManager.validateTokenAge(
        refreshToken.expiresIn
      );
      const token = await this.generateRefreshTokenProvider.generateToken(
        refreshToken.userId
      );

      if (refreshTokenExpired) {
        await this.refreshTokenRepository.delete(refreshToken.userId);
        const newRefreshToken = await this.refreshTokenRepository.create(
          refreshToken.userId,
          refreshToken.role
        );
        return {
          data: { refreshToken: newRefreshToken, token },
          success: true,
        };
      }

      return { data: { token }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
