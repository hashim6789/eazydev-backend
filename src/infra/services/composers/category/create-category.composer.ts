import { ICategoryRepository } from "../../../repositories";
import {
  CreateCategoryUseCase,
  ICreateCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  CreateCategoryController,
  IController,
} from "../../../../presentation/http/controllers";

import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: ICreateCategoryUseCase = new CreateCategoryUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreateCategoryController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
