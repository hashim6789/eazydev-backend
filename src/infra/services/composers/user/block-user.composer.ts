import { IUsersRepository } from "../../../repositories";
import { IBlockUserUseCase } from "../../../../app/usecases/user/interfaces/block-user.usecase";
import { BlockUserUseCase } from "../../../../app/usecases/user/implementations/block-user.usecase";
import { IController } from "../../../../presentation/http/controllers";
import { BlockUserController } from "../../../../presentation/http/controllers/user/block-user.controller";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import { UserModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function blockUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IBlockUserUseCase = new BlockUserUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new BlockUserController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
