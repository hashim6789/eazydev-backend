import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { UserModel } from "../../../databases/models";
import {
  GetUserDataUseCase,
  IGetUserDataUseCase,
} from "../../../../app/usecases/user";
import { GetUserDataController } from "../../../../presentation/http/controllers";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getUserDataComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetUserDataUseCase = new GetUserDataUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetUserDataController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
