import { IGenerateRefreshTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { SignupUseCase } from "../../../../app/usecases/auth/implementations/signup-auth.usecase";
import { ISignupUseCase } from "../../../../app/usecases/auth/signup-auth.usecase";
import { SignupController } from "../../../../presentation/http/controllers/auth/implementations/signup.controller";
import { IController } from "../../../../presentation/http/IController";
import { GenerateRefreshTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function signupComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository();
  const generateRefreshTokenProvider: IGenerateRefreshTokenProvider =
    new GenerateRefreshTokenProvider();
  const useCase: ISignupUseCase = new SignupUseCase(
    repository,
    passwordHasher,
    refreshTokenRepository,
    generateRefreshTokenProvider
  );
  const controller: IController = new SignupController(useCase);
  return controller;
}
