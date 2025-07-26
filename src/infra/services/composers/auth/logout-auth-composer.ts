import { ITokenRepository } from "../../../repositories";
import { LogoutUseCase } from "../../../../app/usecases/auth/implementations/logout-auth.usecase";
import { ILogoutUseCase } from "../../../../app/usecases/auth/interfaces/logout-auth.usecase";
import { LogoutController } from "../../../../presentation/http/controllers/auth/logout.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel } from "../../../databases/models";
import { TokenRepository } from "../../../repositories/implementations/token-repository";

export function logoutComposer(): IController {
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const useCase: ILogoutUseCase = new LogoutUseCase(refreshTokenRepository);
  const controller: IController = new LogoutController(useCase);
  return controller;
}
