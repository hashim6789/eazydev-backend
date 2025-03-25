import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { LogoutUseCase } from "../../../../app/usecases/auth/implementations/logout-auth.usecase";
import { ILogoutUseCase } from "../../../../app/usecases/auth/interfaces/logout-auth.usecase";
import { LogoutController } from "../../../../presentation/http/controllers/auth/logout.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";

export function logoutComposer(): IController {
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository();
  const useCase: ILogoutUseCase = new LogoutUseCase(refreshTokenRepository);
  const controller: IController = new LogoutController(useCase);
  return controller;
}
