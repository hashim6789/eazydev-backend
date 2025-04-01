import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IGetUserUseCase } from "../../../../app/usecases/user/interfaces/get-user.uscase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetUserController } from "../../../../presentation/http/controllers/user/get-user.controller";
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../databases/models";
import {
  GetUserDataUseCase,
  IGetUserDataUseCase,
} from "../../../../app/usecases/user";
import { GetUserDataController } from "../../../../presentation/http/controllers";

export function getUserDataComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetUserDataUseCase = new GetUserDataUseCase(repository);
  const controller: IController = new GetUserDataController(useCase);
  return controller;
}
