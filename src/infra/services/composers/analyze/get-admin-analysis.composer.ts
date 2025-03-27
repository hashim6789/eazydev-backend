import {
  ICourseRepository,
  IProgressRepository,
  IPurchaseRepository,
  IUsersRepository,
} from "../../../../app/repositories";
import { IController } from "../../../../presentation/http/controllers";
import {
  CourseRepository,
  ProgressRepository,
  PurchaseRepository,
  UserRepository,
} from "../../../repositories";
import {
  CourseModel,
  ProgressModel,
  PurchaseModel,
  UserModel,
} from "../../../databases/models";
import {
  GetAdminAnalyzeUseCase,
  GetMentorAnalyzeUseCase,
  IGetAdminAnalyzeUseCase,
  IGetMentorAnalyzeUseCase,
} from "../../../../app/usecases/analyze";
import { GetMentorAnalyzeController } from "../../../../presentation/http/controllers/analyze";

export function getAdminAnalysisComposer(): IController {
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const purchaseRepository: IPurchaseRepository = new PurchaseRepository(
    PurchaseModel
  );

  const userRepository: IUsersRepository = new UserRepository(UserModel);

  const useCase: IGetAdminAnalyzeUseCase = new GetAdminAnalyzeUseCase(
    userRepository,
    progressRepository,
    purchaseRepository
  );
  const controller: IController = new GetMentorAnalyzeController(useCase);
  return controller;
}
