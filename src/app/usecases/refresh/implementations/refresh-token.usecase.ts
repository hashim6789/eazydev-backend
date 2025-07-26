import { ResponseDTO } from "../../../../domain/dtos/response";
import { IRefreshTokenUserUseCase } from "../interfaces/refresh-token.usecas";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { IGenerateTokenProvider } from "../../../../infra/providers";
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
    private generateTokenProvider: IGenerateTokenProvider // private refreshTokenRepository: ITokenRepository,
  ) // private tokenManager: ITokenManagerProvider
  {}

  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {ITokenUserDTO} tokenId - The refresh token information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({ userId, role }: Payload): Promise<ResponseDTO> {
    try {
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
