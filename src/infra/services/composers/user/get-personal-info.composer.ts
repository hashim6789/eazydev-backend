import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/user.repository";
import { IGetPersonalInfoUseCase } from "../../../../app/usecases/user";
import { GetPersonalInfoUseCase } from "../../../../app/usecases/user/implementations/get-personal-infor.usecase";
import { GetPersonalInfoController } from "../../../../presentation/http/controllers";

export function getPersonalInfoComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const useCase: IGetPersonalInfoUseCase = new GetPersonalInfoUseCase(
    repository
  );
  const controller: IController = new GetPersonalInfoController(useCase);
  return controller;
}
