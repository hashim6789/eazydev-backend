import {
  ICourseRepository,
  IProgressRepository,
  IPurchaseRepository,
} from "../../../../app/repositories";
import { CreatePurchaseUseCases } from "../../../../app/usecases/purchase/implementations/create-purchase.usecase";
import { ICreatePurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CreatePurchaseController } from "../../../../presentation/http/controllers/purchase";
import {
  CourseModel,
  ProgressModel,
  PurchaseModel,
} from "../../../databases/models";
import { CourseRepository, ProgressRepository } from "../../../repositories";
import { PurchaseRepository } from "../../../repositories/purchase-repository";

export function createPurchaseComposer(): IController {
  const repository: IPurchaseRepository = new PurchaseRepository(PurchaseModel);
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const courseRepository: ICourseRepository = new CourseRepository(CourseModel);
  const useCase: ICreatePurchaseUseCase = new CreatePurchaseUseCases(
    repository,
    courseRepository,
    progressRepository
  );
  const controller: IController = new CreatePurchaseController(useCase);
  return controller;
}
