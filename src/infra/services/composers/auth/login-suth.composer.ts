import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/interfaces/login-auth.usecase";
import { LoginController } from "../../../../presentation/http/controllers/auth/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RefreshTokenModel, UserModel } from "../../../databases/models";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository(RefreshTokenModel);
  const useCase: ILoginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    generateRefreshTokenProvider,
    refreshTokenRepository
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
