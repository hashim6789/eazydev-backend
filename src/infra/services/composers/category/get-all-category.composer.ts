import { ICategoryRepository } from "../../../../app/repositories";
import {
  GetAllCategoryUseCase,
  IGetAllCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  GetAllCategoryController,
  IController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories";

export function getAllCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IGetAllCategoryUseCase = new GetAllCategoryUseCase(repository);
  const controller: IController = new GetAllCategoryController(useCase);
  return controller;
}
