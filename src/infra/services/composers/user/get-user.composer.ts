import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IGetUserUseCase } from "../../../../app/usecases/user/get-user.uscase";
import { GetUserUseCase } from "../../../../app/usecases/user/implementations/get-user.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetUserController } from "../../../../presentation/http/controllers/user/implementations/get-user.controller";
import { UserRepository } from "../../../repositories/user.repository";

export function getUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const useCase: IGetUserUseCase = new GetUserUseCase(repository);
  const controller: IController = new GetUserController(useCase);
  return controller;
}
