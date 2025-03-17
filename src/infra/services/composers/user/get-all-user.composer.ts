import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IGetAllUserUseCase } from "../../../../app/usecases/user/get-all-user.usecase";
import { GetAllUserUseCase } from "../../../../app/usecases/user/implementations/get-all-user.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllUserController } from "../../../../presentation/http/controllers/user/get-all-user.controller";
import { UserRepository } from "../../../repositories/user.repository";

export function getAllUsersComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository);
  const controller: IController = new GetAllUserController(useCase);
  return controller;
}
