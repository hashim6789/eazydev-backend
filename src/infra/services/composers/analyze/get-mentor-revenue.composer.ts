import { IPurchaseRepository, IUsersRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import {
  PurchaseRepository,
  UserRepository,
} from "../../../repositories/implementations";
import { PurchaseModel, UserModel } from "../../../databases/models";
import {
  GetMentorRevenueAnalyzeUseCase,
  IGetMentorRevenueAnalyzeUseCase,
} from "../../../../app/usecases/analyze";
import { GetMentorRevenueAnalysisController } from "../../../../presentation/http/controllers/analyze";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getMentorRevenueAnalysisComposer(): IController {
  const purchaseRepository: IPurchaseRepository = new PurchaseRepository(
    PurchaseModel
  );
  const userRepository: IUsersRepository = new UserRepository(UserModel);
  const useCase: IGetMentorRevenueAnalyzeUseCase =
    new GetMentorRevenueAnalyzeUseCase(purchaseRepository, userRepository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetMentorRevenueAnalysisController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
