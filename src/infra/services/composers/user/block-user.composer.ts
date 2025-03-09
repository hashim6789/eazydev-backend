import { IUsersRepository } from "../../../../app/repositories/user.repository";
import { IBlockUserUseCase } from "../../../../app/usecases/user/block-user.usecase";
import { BlockUserUseCase } from "../../../../app/usecases/user/implementations/block-user.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { BlockUserController } from "../../../../presentation/http/controllers/user/implementations/block-user.controller";
import { UserRepository } from "../../../repositories/user.repository";

export function blockUserComposer(): IController {
  const repository: IUsersRepository = new UserRepository();
  const useCase: IBlockUserUseCase = new BlockUserUseCase(repository);
  const controller: IController = new BlockUserController(useCase);
  return controller;
}
