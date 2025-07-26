import { IProgressRepository } from "../../../repositories";
import {
  GetAllProgressUseCase,
  IGetAllProgressUseCase,
} from "../../../../app/usecases/progress";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllProgressController } from "../../../../presentation/http/controllers/progress";
import { ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories/implementations";

export function getAllProgressComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const useCase: IGetAllProgressUseCase = new GetAllProgressUseCase(repository);
  const controller: IController = new GetAllProgressController(useCase);
  return controller;
}
