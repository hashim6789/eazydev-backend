import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  IVerifyPasswordUseCase,
  VerifyPasswordUseCase,
} from "../../../../app/usecases/user";
import { VerifyPasswordController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import { PasswordHasher } from "../../../providers/implementations";
import { IPasswordHasher } from "../../../providers";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function VerifyPasswordComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: IVerifyPasswordUseCase = new VerifyPasswordUseCase(
    repository,
    passwordHasher
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new VerifyPasswordController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
