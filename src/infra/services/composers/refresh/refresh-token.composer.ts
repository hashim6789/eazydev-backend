import { ITokenRepository } from "../../../repositories";
import { RefreshTokenUserUseCase } from "../../../../app/usecases/refresh/implementations/refresh-token.usecase";
import { IRefreshTokenUserUseCase } from "../../../../app/usecases/refresh/interfaces/refresh-token.usecas";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenUserController } from "../../../../presentation/http/controllers/refresh/refresh.controller";
import { TokenModel } from "../../../databases/models";
import {
  IGenerateTokenProvider,
  ITokenManagerProvider,
} from "../../../providers";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import { TokenManagerProvider } from "../../../providers/implementations/token-manager.provider";
import { TokenRepository } from "../../../repositories/implementations/token-repository";

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  // const refreshTokenRepository: ITokenRepository = new TokenRepository(
  //   TokenModel
  // );
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  // const tokenManagerProvider: ITokenManagerProvider =
  //   new TokenManagerProvider();
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    generateTokenProvider
    // refreshTokenRepository,
    // tokenManagerProvider
  );
  const controller: IController = new RefreshTokenUserController(useCase);
  return controller;
}
