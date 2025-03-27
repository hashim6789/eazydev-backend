import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/user.repository";
import {
  IUpdatePersonalInfoUseCase,
  UpdatePersonalInfoUseCase,
} from "../../../../app/usecases/user";
import { UpdatePersonalInfoController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";

export function updatePersonalInfoComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IUpdatePersonalInfoUseCase = new UpdatePersonalInfoUseCase(
    repository
  );
  const controller: IController = new UpdatePersonalInfoController(useCase);
  return controller;
}
