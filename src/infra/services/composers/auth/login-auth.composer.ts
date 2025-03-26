import { IGenerateTokenProvider } from "../../../../app/providers/generate-refresh-token.provider";
import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { ITokenRepository } from "../../../../app/repositories/token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { ILoginUseCase } from "../../../../app/usecases/auth/interfaces";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations";
import { LoginController } from "../../../../presentation/http/controllers/auth/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GenerateTokenProvider } from "../../../providers/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { TokenRepository } from "../../../repositories/token-repository";
import { UserRepository } from "../../../repositories/user.repository";
import { TokenModel, UserModel } from "../../../databases/models";

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const useCase: ILoginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    generateTokenProvider,
    refreshTokenRepository
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
