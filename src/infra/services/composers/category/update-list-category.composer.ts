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
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateListCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IUpdateListCategoryUseCase = new UpdateListCategoryUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateListCategoryController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
