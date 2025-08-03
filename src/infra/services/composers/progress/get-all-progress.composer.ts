import { IProgressRepository } from "../../../repositories";
import {
  GetAllProgressUseCase,
  IGetAllProgressUseCase,
} from "../../../../app/usecases/progress";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllProgressController } from "../../../../presentation/http/controllers/progress";
import { ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllProgressComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const useCase: IGetAllProgressUseCase = new GetAllProgressUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllProgressController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
