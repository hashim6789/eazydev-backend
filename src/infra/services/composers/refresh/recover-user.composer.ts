import { ITokenManagerProvider } from "../../../../app/providers/token-manager.provider";
import { IRefreshTokenRepository } from "../../../../app/repositories/refresh-token.repository";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { RecoverUserInformationUserUseCase } from "../../../../app/usecases/refresh/implementations/recover-user-info.usecase";
import { IRecoverUserInformationUseCase } from "../../../../app/usecases/refresh/interfaces/recover-user-info.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { RecoverUserInformationUserController } from "../../../../presentation/http/controllers/refresh/recover-user-info.controller";
import { RefreshTokenModel, UserModel } from "../../../databases/models";
import { TokenManagerProvider } from "../../../providers/token-manager.provider";
import { RefreshTokenRepository } from "../../../repositories/refresh-token-repository";
import { UserRepository } from "../../../repositories/user.repository";

/**
 * Composer function for creating and configuring the components required for recovering user information.
 *
 * @function
 * @returns {IController} The configured user information recovery controller.
 */
export function recoverUserInformationUserComposer(): IController {
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const refreshTokenRepository: IRefreshTokenRepository =
    new RefreshTokenRepository(RefreshTokenModel);
  const tokenManagerProvider: ITokenManagerProvider =
    new TokenManagerProvider();
  const useCase: IRecoverUserInformationUseCase =
    new RecoverUserInformationUserUseCase(
      refreshTokenRepository,
      userRepository,
      tokenManagerProvider
    );
  const controller: IController = new RecoverUserInformationUserController(
    useCase
  );
  return controller;
}
