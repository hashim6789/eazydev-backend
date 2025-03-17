import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { ILoginUseCase } from "../../../../app/usecases/auth";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations";
import { LoginController } from "../../../../presentation/http/controllers/auth/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository();
  const useCase: ILoginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    generateRefreshTokenProvider,
    refreshTokenRepository
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
