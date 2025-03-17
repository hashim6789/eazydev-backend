import { ICourseRepository } from "../../../../app/repositories";
import {
  IUpdateStatusCourseUseCase,
  UpdateStatusCourseUseCase,
} from "../../../../app/usecases/course";
import {
  IController,
  UpdateStatusCourseController,
} from "../../../../presentation/http/controllers";
import { CourseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories";

export function updateCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IUpdateStatusCourseUseCase = new UpdateStatusCourseUseCase(
    repository
  );
  const controller: IController = new UpdateStatusCourseController(useCase);
  return controller;
}
