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

export function getCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IGetCourseUseCase = new GetCourseUseCase(repository);
  const controller: IController = new GetCourseController(useCase);
  return controller;
}
