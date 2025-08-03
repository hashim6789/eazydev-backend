import { IUsersRepository } from "../../../repositories";
import { IGetUserUseCase } from "../../../../app/usecases/user/interfaces/get-user.uscase";
import { GetUserUseCase } from "../../../../app/usecases/user/implementations/get-user.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetUserController } from "../../../../presentation/http/controllers/user/get-user.controller";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { UserModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetUserUseCase = new GetUserUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetUserController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
