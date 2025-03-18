import { ICategoryRepository } from "../../../../app/repositories";
import {
  CreateCategoryUseCase,
  ICreateCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  CreateCategoryController,
  IController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories";

export function createCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: ICreateCategoryUseCase = new CreateCategoryUseCase(repository);
  const controller: IController = new CreateCategoryController(useCase);
  return controller;
}
