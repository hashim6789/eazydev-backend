import { IPurchaseRepository } from "../../../repositories";
import {
  CheckCoursePurchasedUseCases,
  GetAllPurchaseUseCases,
} from "../../../../app/usecases/purchase/implementations";
import {
  ICheckCoursePurchasedUseCase,
  IGetAllPurchaseUseCase,
} from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import {
  CheckCoursePurchasedController,
  GetAllPurchaseController,
} from "../../../../presentation/http/controllers/purchase";
import { PurchaseModel } from "../../../databases/models";
import { PurchaseRepository } from "../../../repositories/implementations/purchase-repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function checkCoursePurchasedComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const useCase: ICheckCoursePurchasedUseCase =
    new CheckCoursePurchasedUseCases(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CheckCoursePurchasedController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
