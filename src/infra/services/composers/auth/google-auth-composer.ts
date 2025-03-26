import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IGoogleLoginUseCase } from "../../../../app/usecases/auth/interfaces/google-login.usecase";
import { GoogleLoginUseCase } from "../../../../app/usecases/auth/implementations/google.auth.usecase";
import { GoogleLoginController } from "../../../../presentation/http/controllers/auth/google-login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenModel, UserModel } from "../../../databases/models";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function googleLoginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository(RefreshTokenModel);
  const useCase: IGoogleLoginUseCase = new GoogleLoginUseCase(
    repository,
    refreshTokenRepository,
    generateRefreshTokenProvider
  );
  const controller: IController = new GoogleLoginController(useCase);
  return controller;
}
