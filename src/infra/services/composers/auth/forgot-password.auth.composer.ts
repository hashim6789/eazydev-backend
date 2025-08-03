import {
  ForgotPasswordUseCase,
  IForgotPasswordUseCase,
} from "../../../../app/usecases/auth";
import { ForgotPasswordController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { ISendMailProvider } from "../../../providers";
import { SendMailProvider } from "../../../providers/implementations";
import { ITokenRepository, IUsersRepository } from "../../../repositories";
import { TokenRepository } from "../../../repositories/implementations/token-repository";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

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
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new ForgotPasswordController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
