import { ICourseRepository } from "../../../repositories";
import { ICreateCourseUseCase } from "../../../../app/usecases/course";
import { CreateCourseUseCase } from "../../../../app/usecases/course/implementations/create-course.usecase";
import { CreateCourseController } from "../../../../presentation/http/controllers/course";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: ICreateCourseUseCase = new CreateCourseUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreateCourseController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
