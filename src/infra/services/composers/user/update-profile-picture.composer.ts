import { IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/implementations/user.repository";
import {
  IUpdateProfilePictureUseCase,
  UpdateProfilePictureUseCase,
} from "../../../../app/usecases/user";
import { UpdateProfilePictureController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateProfilePictureComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IUpdateProfilePictureUseCase = new UpdateProfilePictureUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateProfilePictureController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
