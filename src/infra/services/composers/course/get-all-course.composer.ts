import { ICourseRepository } from "../../../../app/repositories";
import {
  GetAllCourseUseCase,
  IGetAllCourseUseCase,
} from "../../../../app/usecases/course";
import {
  GetAllCourseController,
  IController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories";

export function getAllCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IGetAllCourseUseCase = new GetAllCourseUseCase(repository);
  const controller: IController = new GetAllCourseController(useCase);
  return controller;
}
