import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IBlockUserUseCase } from "../../../../app/usecases/user/interfaces/block-user.usecase";
import { BlockUserUseCase } from "../../../../app/usecases/user/implementations/block-user.usecase";
import { IController } from "../../../../presentation/http/controllers";
import { BlockUserController } from "../../../../presentation/http/controllers/user/block-user.controller";
import { UserRepository } from "../../../repositories/user.repository";
import { UserModel } from "../../../databases/models";

export function blockUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IBlockUserUseCase = new BlockUserUseCase(repository);
  const controller: IController = new BlockUserController(useCase);
  return controller;
}
