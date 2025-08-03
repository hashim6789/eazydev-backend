import { ICourseRepository } from "../../../repositories";
import {
  GetAllCourseUseCase,
  IGetAllCourseUseCase,
} from "../../../../app/usecases/course";
import {
  GetAllCourseController,
  GetAllCourseNoAuthController,
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

export function getAllCourseNoAuthComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IGetAllCourseUseCase = new GetAllCourseUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllCourseNoAuthController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
