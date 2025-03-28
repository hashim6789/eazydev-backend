import {
  IProgressRepository,
  IPurchaseRepository,
  IUsersRepository,
} from "../../../../app/repositories";
import { IController } from "../../../../presentation/http/controllers";
import {
  ProgressRepository,
  PurchaseRepository,
  UserRepository,
} from "../../../repositories";
import {
  ProgressModel,
  PurchaseModel,
  UserModel,
} from "../../../databases/models";
import {
  GetAdminAnalyzeUseCase,
  IGetAdminAnalyzeUseCase,
} from "../../../../app/usecases/analyze";
import { GetAdminAnalyzeController } from "../../../../presentation/http/controllers/analyze";

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
  const controller: IController = new GetAdminAnalyzeController(useCase);
  return controller;
}
