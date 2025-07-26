import { IUsersRepository } from "../../../../app/repositories";
import { ITokenRepository } from "../../../../app/repositories/token.repository";
import {
  GetResetPageUseCase,
  IResetPasswordUseCase,
  ResetPasswordUseCase,
} from "../../../../app/usecases/auth";
import {
  GetResetPasswordPageController,
  ResetPasswordController,
} from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { IPasswordHasher } from "../../../providers";
import { PasswordHasher } from "../../../providers/implementations";
import { TokenRepository, UserRepository } from "../../../repositories";

export function resetPasswordComposer(): IController {
  const repository: ITokenRepository = new TokenRepository(TokenModel);
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IResetPasswordUseCase = new ResetPasswordUseCase(
    repository,
    userRepository,
    passwordHasher
  );
  const controller: IController = new ResetPasswordController(useCase);
  return controller;
}
