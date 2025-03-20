import {
  ICourseRepository,
  IPurchaseRepository,
} from "../../../../app/repositories";
import { GetPurchaseUseCases } from "../../../../app/usecases/purchase/implementations";
import { CreatePurchaseUseCases } from "../../../../app/usecases/purchase/implementations/create-purchase.usecase";
import {
  ICreatePurchaseUseCase,
  IGetPurchaseUseCase,
} from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import {
  CreatePurchaseController,
  GetPurchaseController,
} from "../../../../presentation/http/controllers/purchase";
import { CourseModel, PurchaseModel } from "../../../databases/models";
import { CourseRepository } from "../../../repositories";
import { PurchaseRepository } from "../../../repositories/purchase-repository";

export function getPurchaseComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const courseRepository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: IGetPurchaseUseCase = new GetPurchaseUseCases(
    repository,
    courseRepository
  );
  const controller: IController = new GetPurchaseController(useCase);
  return controller;
}
