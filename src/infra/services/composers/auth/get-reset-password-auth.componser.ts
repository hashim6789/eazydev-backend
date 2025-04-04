import { ITokenRepository } from "../../../../app/repositories/token.repository";
import {
  GetResetPageUseCase,
  IGetResetPageUseCase,
} from "../../../../app/usecases/auth";
import { GetResetPasswordPageController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel } from "../../../databases/models";
import { TokenRepository } from "../../../repositories";

export function getResetPageComposer(): IController {
  const repository: ITokenRepository = new TokenRepository(TokenModel);
  const useCase: IGetResetPageUseCase = new GetResetPageUseCase(repository);
  const controller: IController = new GetResetPasswordPageController(useCase);
  return controller;
}
