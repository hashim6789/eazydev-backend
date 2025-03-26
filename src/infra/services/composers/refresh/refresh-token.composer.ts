import { IGenerateTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { ITokenManagerProvider } from "../../../../app/providers/token-manager.provider";
import { ITokenRepository } from "../../../../app/repositories/token.repository";
import { RefreshTokenUserUseCase } from "../../../../app/usecases/refresh/implementations/refresh-token.usecase";
import { IRefreshTokenUserUseCase } from "../../../../app/usecases/refresh/interfaces/refresh-token.usecas";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenUserController } from "../../../../presentation/http/controllers/refresh/refresh.controller";
import { TokenModel } from "../../../databases/models";
import { GenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { TokenManagerProvider } from "../../../providers/token-manager.provider";
import { TokenRepository } from "../../../repositories/token-repository";

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    generateTokenProvider,
    refreshTokenRepository,
    tokenManagerProvider
  );
  const controller: IController = new RefreshTokenUserController(useCase);
  return controller;
}
