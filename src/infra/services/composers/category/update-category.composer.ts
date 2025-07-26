import { ICategoryRepository } from "../../../repositories";
import { IUpdateCategoryUseCase } from "../../../../app/usecases/category";
import { UpdateCategoryUseCase } from "../../../../app/usecases/category/implementations/update-category.usecase";
import {
  IController,
  updateCategoryController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories/implementations";

export function updateCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IUpdateCategoryUseCase = new UpdateCategoryUseCase(repository);
  const controller: IController = new updateCategoryController(useCase);
  return controller;
}
