import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  IUpdatePersonalInfoUseCase,
  UpdatePersonalInfoUseCase,
} from "../../../../app/usecases/user";
import { UpdatePersonalInfoController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updatePersonalInfoComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IUpdatePersonalInfoUseCase = new UpdatePersonalInfoUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdatePersonalInfoController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
