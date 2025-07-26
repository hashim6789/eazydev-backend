import { ICategoryRepository } from "../../../repositories";
import {
  IUpdateListCategoryUseCase,
  UpdateListCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  IController,
  UpdateListCategoryController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories/implementations";

export function updateListCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IUpdateListCategoryUseCase = new UpdateListCategoryUseCase(
    repository
  );
  const controller: IController = new UpdateListCategoryController(useCase);
  return controller;
}
