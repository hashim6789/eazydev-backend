import { IPasswordHasher } from "../../../../app/providers/password-hasher.provider";
import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { ICreateUserUseCase } from "../../../../app/usecases/user/create-user.usecase";
import { IGetAllUserUseCase } from "../../../../app/usecases/user/get-all-user.usecase";
import { CreateUserUseCase } from "../../../../app/usecases/user/implementations/create-user.usecase";
import { GetAllUserUseCase } from "../../../../app/usecases/user/implementations/get-all-user.usecase";
import { CreateUserController } from "../../../../presentation/http/controllers/user/implementations/create-user.controller";
import { GetAllUserController } from "../../../../presentation/http/controllers/user/implementations/get-all-user.controller";
import { IController } from "../../../../presentation/http/IController";
import { PasswordHasher } from "../../../providers/password-hasher.provider";
import { UserRepository } from "../../../repositories/user.repository";

export function getUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository);
  const controller: IController = new GetAllUserController(useCase);
  return controller;
}
