import { IProgressRepository } from "../../../../app/repositories";
import {
  IUpdateProgressUseCase,
  UpdateProgressUseCase,
} from "../../../../app/usecases/progress";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UpdateProgressController } from "../../../../presentation/http/controllers/progress";
import { GetSignedUrlController } from "../../../../presentation/http/controllers/progress/get-signed-url.controller";
import { ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories";

export function updateProgressComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const useCase: IUpdateProgressUseCase = new UpdateProgressUseCase(repository);
  const controller: IController = new UpdateProgressController(useCase);
  return controller;
}
