import { ITokenRepository, IUsersRepository } from "../../../repositories";
import {
  IResetPasswordUseCase,
  ResetPasswordUseCase,
} from "../../../../app/usecases/auth";
import { ResetPasswordController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel, UserModel } from "../../../databases/models";
import { IPasswordHasher } from "../../../providers";
import { PasswordHasher } from "../../../providers/implementations";
import {
  TokenRepository,
  UserRepository,
} from "../../../repositories/implementations";

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
