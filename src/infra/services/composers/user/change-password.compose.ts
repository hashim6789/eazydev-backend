import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  ChangePasswordUseCase,
  IChangePasswordUseCase,
} from "../../../../app/usecases/user";
import { ChangePasswordController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import { PasswordHasher } from "../../../providers/implementations";
import { IPasswordHasher } from "../../../providers";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function ChangePasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IChangePasswordUseCase = new ChangePasswordUseCase(
    repository,
    passwordHasher
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new ChangePasswordController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
