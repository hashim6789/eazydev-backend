import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UserRepository } from "../../../repositories/user.repository";
import {
  IUpdateProfilePictureUseCase,
  UpdateProfilePictureUseCase,
} from "../../../../app/usecases/user";
import { UpdateProfilePictureController } from "../../../../presentation/http/controllers";
import { UserModel } from "../../../databases/models";

export function updateProfilePictureComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IUpdateProfilePictureUseCase = new UpdateProfilePictureUseCase(
    repository
  );
  const controller: IController = new UpdateProfilePictureController(useCase);
  return controller;
}
