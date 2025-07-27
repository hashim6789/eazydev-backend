import { ICourseRepository } from "../../../repositories";
import {
  IUpdateCourseUseCase,
  UpdateCourseUseCase,
} from "../../../../app/usecases/course";
import {
  IController,
  UpdateCourseController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IUpdateCourseUseCase = new UpdateCourseUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateCourseController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
