import { IPurchaseRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers";
import { PurchaseRepository } from "../../../repositories/implementations";
import { PurchaseModel } from "../../../databases/models";
import {
  GetAdminRevenueAnalyzeUseCase,
  IGetAdminRevenueAnalyzeUseCase,
} from "../../../../app/usecases/analyze";
import { GetAdminAnalyzeController } from "../../../../presentation/http/controllers/analyze";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAdminRevenueAnalysisComposer(): IController {
  const purchaseRepository: IPurchaseRepository = new PurchaseRepository(
    PurchaseModel
  );
  const useCase: IGetAdminRevenueAnalyzeUseCase =
    new GetAdminRevenueAnalyzeUseCase(purchaseRepository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAdminAnalyzeController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
