import { IGoogleLoginUseCase } from "../../../../app/usecases/auth/interfaces/google-login.usecase";
import { GoogleLoginUseCase } from "../../../../app/usecases/auth/implementations/google.auth.usecase";
import { GoogleLoginController } from "../../../../presentation/http/controllers/auth/google-login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserModel } from "../../../databases/models";
import { GenerateTokenProvider } from "../../../providers/implementations/generate-refresh-token.provider";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { IGenerateTokenProvider } from "../../../providers";
import { IUsersRepository } from "../../../repositories";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function googleLoginComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const generateTokenProvider: IGenerateTokenProvider =
    new GenerateTokenProvider();

  const useCase: IGoogleLoginUseCase = new GoogleLoginUseCase(
    repository,
    generateTokenProvider
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GoogleLoginController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
