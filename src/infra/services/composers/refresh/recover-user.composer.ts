import { ITokenRepository, IUsersRepository } from "../../../repositories";
import { RecoverUserInformationUserUseCase } from "../../../../app/usecases/refresh/implementations/recover-user-info.usecase";
import { IRecoverUserInformationUseCase } from "../../../../app/usecases/refresh/interfaces/recover-user-info.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RecoverUserInformationUserController } from "../../../../presentation/http/controllers/refresh/recover-user-info.controller";
import { TokenModel, UserModel } from "../../../databases/models";
import { ITokenManagerProvider } from "../../../providers";
import { TokenManagerProvider } from "../../../providers/implementations/token-manager.provider";
import { TokenRepository } from "../../../repositories/implementations/token-repository";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

/**
 * Composer function for creating and configuring the components required for recovering user information.
 *
 * @function
 * @returns {IController} The configured user information recovery controller.
 */
export function recoverUserInformationUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const refreshTokenRepository: ITokenRepository = new TokenRepository(
    TokenModel
  );
  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();
  const useCase: IRecoverUserInformationUseCase =
    new RecoverUserInformationUserUseCase(
      refreshTokenRepository,
      userRepository,
      tokenManagerProvider
    );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new RecoverUserInformationUserController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
