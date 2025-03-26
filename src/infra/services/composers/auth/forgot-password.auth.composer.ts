import { ITokenRepository } from "../../../../app/repositories/token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import {
  ForgotPasswordUseCase,
  IForgotPasswordUseCase,
} from "../../../../app/usecases/auth";
import { LoginController } from "../../../../presentation/http/controllers/auth/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { TokenRepository } from "../../../repositories/token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function forgotPasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const useCase: IForgotPasswordUseCase = new ForgotPasswordUseCase(
    repository,
    refreshTokenRepository
  );
  const controller: IController = new LoginController(useCase);
  return controller;
}
