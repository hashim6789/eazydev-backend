import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
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
