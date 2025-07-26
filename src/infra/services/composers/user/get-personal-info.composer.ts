import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { IGetPersonalInfoUseCase } from "../../../../app/usecases/user";
import { GetPersonalInfoUseCase } from "../../../../app/usecases/user/implementations/get-personal-infor.usecase";
import { GetPersonalInfoController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";

export function getPersonalInfoComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetPersonalInfoUseCase = new GetPersonalInfoUseCase(
    repository
  );
  const controller: IController = new GetPersonalInfoController(useCase);
  return controller;
}
