import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/user.repository";
import {
  ChangePasswordUseCase,
  IChangePasswordUseCase,
  IUpdatePersonalInfoUseCase,
  IVerifyPasswordUseCase,
  UpdatePersonalInfoUseCase,
  VerifyPasswordUseCase,
} from "../../../../app/usecases/user";
import {
  ChangePasswordController,
  UpdatePersonalInfoController,
  VerifyPasswordController,
} from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import { PasswordHasher } from "../../../providers/implementations";
import { IPasswordHasher } from "../../../providers";

export function ChangePasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IChangePasswordUseCase = new ChangePasswordUseCase(
    repository,
    passwordHasher
  );
  const controller: IController = new ChangePasswordController(useCase);
  return controller;
}
