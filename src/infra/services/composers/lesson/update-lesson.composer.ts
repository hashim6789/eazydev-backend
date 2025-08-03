import { ILessonRepository } from "../../../repositories";
import { UpdateLessonUseCase } from "../../../../app/usecases/lesson/implementations";
import { IUpdateLessonUseCase } from "../../../../app/usecases/lesson/interfaces";
import { UpdateLessonController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { LessonModel } from "../../../databases/models";
import { LessonRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateLessonComposer(): IController {
  const repository: ILessonRepository = new LessonRepository(LessonModel);
  const useCase: IUpdateLessonUseCase = new UpdateLessonUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateLessonController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
