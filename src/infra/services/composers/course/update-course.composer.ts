import { ICourseRepository } from "../../../../app/repositories";
import {
  IUpdateCourseUseCase,
  UpdateCourseUseCase,
} from "../../../../app/usecases/course";
import {
  IController,
  UpdateCourseController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories";

export function updateCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IUpdateCourseUseCase = new UpdateCourseUseCase(repository);
  const controller: IController = new UpdateCourseController(useCase);
  return controller;
}
