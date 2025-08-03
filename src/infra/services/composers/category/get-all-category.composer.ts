import { ICategoryRepository } from "../../../repositories";
import {
  GetAllCategoryUseCase,
  IGetAllCategoryUseCase,
} from "../../../../app/usecases/category";
import {
  GetAllCategoryController,
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

export function getAllCategoryComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IGetAllCategoryUseCase = new GetAllCategoryUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllCategoryController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
