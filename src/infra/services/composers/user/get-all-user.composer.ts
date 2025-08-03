import { IUsersRepository } from "../../../repositories";
import { IGetAllUserUseCase } from "../../../../app/usecases/user/interfaces/get-all-user.usecase";
import { GetAllUserUseCase } from "../../../../app/usecases/user/implementations/get-all-user.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllUserController } from "../../../../presentation/http/controllers/user/get-all-user.controller";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { UserModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllUsersComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllUserController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
