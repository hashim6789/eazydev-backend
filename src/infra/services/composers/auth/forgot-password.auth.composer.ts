import { ISendMailProvider } from "../../../../app/providers";
import { ITokenRepository } from "../../../../app/repositories/token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import {
  ForgotPasswordUseCase,
  IForgotPasswordUseCase,
} from "../../../../app/usecases/auth";
import { ForgotPasswordController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { SendMailProvider } from "../../../providers";
import { TokenRepository } from "../../../repositories/token-repository";
import { UserRepository } from "../../../repositories/user.repository";

export function forgotPasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const resetTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const sentMailProvider: ISendMailProvider = new SendMailProvider();
  const useCase: IForgotPasswordUseCase = new ForgotPasswordUseCase(
    repository,
    resetTokenRepository,
    sentMailProvider
  );
  const controller: IController = new ForgotPasswordController(useCase);
  return controller;
}
