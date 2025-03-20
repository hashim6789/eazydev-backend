// import {
//   ICourseRepository,
//   IPurchaseRepository,
//   IUsersRepository,
// } from "../../../../app/repositories";
// import { CreatePurchaseUseCases } from "../../../../app/usecases/purchase/implementations/create-purchase.usecase";
// import { ICreatePurchaseUseCase } from "../../../../app/usecases/purchase/interfaces";
// import { IController } from "../../../../presentation/http/controllers/IController";
// import { CreatePurchaseController } from "../../../../presentation/http/controllers/purchase";
// import { CourseModel, PurchaseModel } from "../../../databases/models";
// import { CourseRepository, UserRepository } from "../../../repositories";
// import { PurchaseRepository } from "../../../repositories/purchase-repository";

// export function updatePersonalComposer(): IController {
//   const repository: IUsersRepository = new UserRepository();
//   const useCase: ICreatePurchaseUseCase = new CreatePurchaseUseCases(
//     repository,
//     courseRepository
//   );
//   const controller: IController = new CreatePurchaseController(useCase);
//   return controller;
// }
