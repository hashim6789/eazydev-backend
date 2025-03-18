import { ICategoryRepository } from "../../../../app/repositories";
import {
  CreateCategoryUseCase,
  ICreateCategoryUseCase,
  IUpdateCategoryUseCase,
} from "../../../../app/usecases/category";
import { UpdateCategoryUseCase } from "../../../../app/usecases/category/implementations/update-category.usecase";
import {
  CreateCategoryController,
  IController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories";

export function updateCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IUpdateCategoryUseCase = new UpdateCategoryUseCase(repository);
  const controller: IController = new CreateCategoryController(useCase);
  return controller;
}
