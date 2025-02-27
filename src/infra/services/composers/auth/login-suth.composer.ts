import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/login-auth.usecase";
import { LoginController } from "../../../../presentation/http/controllers/auth/implementations/login.controller";
import { IController } from "../../../../presentation/http/IController";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { UserRepository } from "../../../repositories/user.repository";

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const useCase: ILoginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    generateRefreshTokenProvider
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
