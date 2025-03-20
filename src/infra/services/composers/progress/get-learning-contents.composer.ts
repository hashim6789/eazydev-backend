import { IProgressRepository } from "../../../../app/repositories";
import { IGetLearningContentsUseCase } from "../../../../app/usecases/progress";
import { GetLearningContentUseCase } from "../../../../app/usecases/progress/implementations/get-learning-content.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetLearningContentController } from "../../../../presentation/http/controllers/progress";
import { ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories";

export function getLearningContentsComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const useCase: IGetLearningContentsUseCase = new GetLearningContentUseCase(
    repository
  );
  const controller: IController = new GetLearningContentController(useCase);
  return controller;
}
