import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IGoogleLoginUseCase } from "../../../../app/usecases/auth/google-login.usecase";
import { GoogleLoginUseCase } from "../../../../app/usecases/auth/implementations/google.auth.usecase";
import { GoogleLoginController } from "../../../../presentation/http/controllers/auth/implementations/google-login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function googleLoginComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository();
  const useCase: IGoogleLoginUseCase = new GoogleLoginUseCase(
    repository,
    refreshTokenRepository,
    generateRefreshTokenProvider
  );
  const controller: IController = new GoogleLoginController(useCase);
  return controller;
}
