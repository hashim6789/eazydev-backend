import { ICourseRepository, IProgressRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import {
  CourseRepository,
  ProgressRepository,
} from "../../../repositories/implementations";
import { CourseModel, ProgressModel } from "../../../databases/models";
import {
  GetMentorAnalyzeUseCase,
  IGetMentorAnalyzeUseCase,
} from "../../../../app/usecases/analyze";
import { GetMentorAnalyzeController } from "../../../../presentation/http/controllers/analyze";

export function getMentorAnalysisComposer(): IController {
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const courseRepository: ICourseRepository = new CourseRepository(CourseModel);

  const useCase: IGetMentorAnalyzeUseCase = new GetMentorAnalyzeUseCase(
    progressRepository,
    courseRepository
  );
  const controller: IController = new GetMentorAnalyzeController(useCase);
  return controller;
}
