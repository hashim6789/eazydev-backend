import { IPurchaseRepository } from "../../../repositories";
import { GetAllPurchaseUseCases } from "../../../../app/usecases/purchase/implementations";
import { IGetAllPurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllPurchaseController } from "../../../../presentation/http/controllers/purchase";
import { PurchaseModel } from "../../../databases/models";
import { PurchaseRepository } from "../../../repositories/implementations/purchase-repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllPurchaseComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const useCase: IGetAllPurchaseUseCase = new GetAllPurchaseUseCases(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllPurchaseController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
