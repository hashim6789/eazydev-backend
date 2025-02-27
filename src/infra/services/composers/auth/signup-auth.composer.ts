import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { SignupUseCase } from "../../../../app/usecases/auth/implementations/signup-auth.usecase";
import { ISignupUseCase } from "../../../../app/usecases/auth/signup-auth.usecase";
import { SignupController } from "../../../../presentation/http/controllers/auth/implementations/signup.controller";
import { IController } from "../../../../presentation/http/IController";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { UserRepository } from "../../../repositories/user.repository";

export function signupComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const passwordHasher: IPasswordHasher = new PasswordHasher();
  const useCase: ISignupUseCase = new SignupUseCase(repository, passwordHasher);
  const controller: IController = new SignupController(useCase);
  return controller;
}
