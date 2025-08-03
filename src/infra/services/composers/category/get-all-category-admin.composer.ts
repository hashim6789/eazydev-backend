import { ICategoryRepository } from "../../../repositories";
import {
  GetAllCategoryAdminUseCase,
  IGetAllCategoryAdminUseCase,
} from "../../../../app/usecases/category";
import {
  GetAllCategoryAdminController,
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

export function getAllCategoryAdminComposer(): IController {
  const repository: ICategoryRepository = new CategoryRepository(CategoryModel);
  const useCase: IGetAllCategoryAdminUseCase = new GetAllCategoryAdminUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllCategoryAdminController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
