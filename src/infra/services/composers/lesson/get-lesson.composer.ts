import { ILessonRepository } from "../../../repositories";
import { GetLessonUseCase } from "../../../../app/usecases/lesson/implementations";
import { IGetLessonUseCase } from "../../../../app/usecases/lesson/interfaces";
import { GetLessonController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { LessonModel } from "../../../databases/models";
import { LessonRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getLessonComposer(): IController {
  const repository: ILessonRepository = new LessonRepository(LessonModel);
  const useCase: IGetLessonUseCase = new GetLessonUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetLessonController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
