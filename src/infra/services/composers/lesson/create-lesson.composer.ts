import {
  ICourseRepository,
  ILessonRepository,
} from "../../../../app/repositories";
import { CreateLessonUseCase } from "../../../../app/usecases/lesson/implementations";
import { ICreateLessonUseCase } from "../../../../app/usecases/lesson/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CreateLessonController } from "../../../../presentation/http/controllers/lesson/create-lesson.controller";
import { CourseModel, LessonModel } from "../../../databases/models";
import { CourseRepository, LessonRepository } from "../../../repositories";

export function createLessonComposer(): IController {
  const repository: ILessonRepository = new LessonRepository(LessonModel);
  const courseRepository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: ICreateLessonUseCase = new CreateLessonUseCase(
    repository,
    courseRepository
  );
  const controller: IController = new CreateLessonController(useCase);
  return controller;
}
