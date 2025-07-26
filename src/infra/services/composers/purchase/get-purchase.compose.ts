import { IPurchaseRepository } from "../../../repositories";
import { GetPurchaseUseCases } from "../../../../app/usecases/purchase/implementations";
import { IGetPurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetPurchaseController } from "../../../../presentation/http/controllers/purchase";
import { PurchaseModel } from "../../../databases/models";
import { PurchaseRepository } from "../../../repositories/implementations/purchase-repository";

export function getPurchaseComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const useCase: IGetPurchaseUseCase = new GetPurchaseUseCases(repository);
  const controller: IController = new GetPurchaseController(useCase);
  return controller;
}
