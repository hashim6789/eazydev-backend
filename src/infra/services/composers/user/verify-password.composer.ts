import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/user.repository";
import {
  IVerifyPasswordUseCase,
  VerifyPasswordUseCase,
} from "../../../../app/usecases/user";
import { VerifyPasswordController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import { PasswordHasher } from "../../../providers/implementations";
import { IPasswordHasher } from "../../../providers";

export function VerifyPasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IVerifyPasswordUseCase = new VerifyPasswordUseCase(
    repository,
    passwordHasher
  );
  const controller: IController = new VerifyPasswordController(useCase);
  return controller;
}
