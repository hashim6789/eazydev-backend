import { ITokenRepository } from "../../../repositories";
import {
  GetResetPageUseCase,
  IGetResetPageUseCase,
} from "../../../../app/usecases/auth";
import { GetResetPasswordPageController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { TokenModel } from "../../../databases/models";
import { TokenRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getResetPageComposer(): IController {
  const repository: ITokenRepository = new TokenRepository(TokenModel);
  const useCase: IGetResetPageUseCase = new GetResetPageUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetResetPasswordPageController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
