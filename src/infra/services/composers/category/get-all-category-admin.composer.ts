import { ICategoryRepository } from "../../../../app/repositories";
import {
  GetAllCategoryAdminUseCase,
  IGetAllCategoryAdminUseCase,
} from "../../../../app/usecases/category";
import {
  GetAllCategoryAdminController,
  IController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories";

export function getAllCategoryAdminComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IGetAllCategoryAdminUseCase = new GetAllCategoryAdminUseCase(
    repository
  );
  const controller: IController = new GetAllCategoryAdminController(useCase);
  return controller;
}
