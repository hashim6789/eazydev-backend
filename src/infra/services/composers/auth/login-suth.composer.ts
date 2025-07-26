import { ITokenRepository, IUsersRepository } from "../../../repositories";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/interfaces/login-auth.usecase";
import { LoginController } from "../../../../presentation/http/controllers/auth/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { IGenerateTokenProvider, IPasswordHasher } from "../../../providers";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import { PasswordHasher } from "../../../providers/implementations/password-hasher.provider";
import {
  TokenRepository,
  UserRepository,
} from "../../../repositories/implementations";

export function loginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();

  const useCase: ILoginUseCase = new LoginUseCase(
    repository,
    passwordHasher,
    generateTokenProvider
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
