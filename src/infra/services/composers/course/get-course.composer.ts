import { ICourseRepository } from "../../../repositories";
import {
  GetCourseUseCase,
  IGetCourseUseCase,
} from "../../../../app/usecases/course";
import {
  GetCourseController,
  IController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IGetCourseUseCase = new GetCourseUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetCourseController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
