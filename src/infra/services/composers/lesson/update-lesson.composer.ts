import { ILessonRepository } from "../../../repositories";
import {
  GetLessonUseCase,
  UpdateLessonUseCase,
} from "../../../../app/usecases/lesson/implementations";
import {
  IGetLessonUseCase,
  IUpdateLessonUseCase,
} from "../../../../app/usecases/lesson/interfaces";
import {
  GetLessonController,
  UpdateLessonController,
} from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { LessonModel } from "../../../databases/models";
import { LessonRepository } from "../../../repositories/implementations";

export function updateLessonComposer(): IController {
  const repository: ILessonRepository = new LessonRepository(LessonModel);
  const useCase: IUpdateLessonUseCase = new UpdateLessonUseCase(repository);
  const controller: IController = new UpdateLessonController(useCase);
  return controller;
}
