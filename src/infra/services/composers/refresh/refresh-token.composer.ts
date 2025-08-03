import { RefreshTokenUserUseCase } from "../../../../app/usecases/refresh/implementations/refresh-token.usecase";
import { IRefreshTokenUserUseCase } from "../../../../app/usecases/refresh/interfaces/refresh-token.usecas";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenUserController } from "../../../../presentation/http/controllers/refresh/refresh.controller";
import { IGenerateTokenProvider } from "../../../providers";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

/**
 * Composer function for creating and configuring the components required for refreshing authentication tokens.
 *
 * @function
 * @returns {IController} The configured refresh token controller.
 */
export function refreshTokenUserComposer(): IController {
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const useCase: IRefreshTokenUserUseCase = new RefreshTokenUserUseCase(
    generateTokenProvider
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new RefreshTokenUserController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
