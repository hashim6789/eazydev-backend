import { ILessonRepository } from "../../../../app/repositories";
import { GetLessonUseCase } from "../../../../app/usecases/lesson/implementations";
import { IGetLessonUseCase } from "../../../../app/usecases/lesson/interfaces";
import { GetLessonController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { LessonModel } from "../../../databases/models";
import { LessonRepository } from "../../../repositories";

export function getLessonComposer(): IController {
  const repository: ILessonRepository = new LessonRepository(LessonModel);
  const useCase: IGetLessonUseCase = new GetLessonUseCase(repository);
  const controller: IController = new GetLessonController(useCase);
  return controller;
}
