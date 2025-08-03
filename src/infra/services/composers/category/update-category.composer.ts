import { ICategoryRepository } from "../../../repositories";
import { IUpdateCategoryUseCase } from "../../../../app/usecases/category";
import { UpdateCategoryUseCase } from "../../../../app/usecases/category/implementations/update-category.usecase";
import {
  IController,
  updateCategoryController,
} from "../../../../presentation/http/controllers";
import { CategoryModel } from "../../../databases/models";
import { CategoryRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IUpdateCategoryUseCase = new UpdateCategoryUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new updateCategoryController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
