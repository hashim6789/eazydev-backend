import { IPurchaseRepository } from "../../../../app/repositories";
import { GetAllPurchaseUseCases } from "../../../../app/usecases/purchase/implementations";
import { IGetAllPurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllPurchaseController } from "../../../../presentation/http/controllers/purchase";
import { PurchaseModel } from "../../../databases/models";
import { PurchaseRepository } from "../../../repositories/purchase-repository";

export function getAllPurchaseComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const useCase: IGetAllPurchaseUseCase = new GetAllPurchaseUseCases(
    repository
  );
  const controller: IController = new GetAllPurchaseController(useCase);
  return controller;
}
