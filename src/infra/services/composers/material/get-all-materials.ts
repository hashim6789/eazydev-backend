import { IMaterialRepository } from "../../../repositories";
import {
  GetAllMaterialUseCase,
  IGetAllMaterialUseCase,
} from "../../../../app/usecases/material";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllMaterialController } from "../../../../presentation/http/controllers/material/get-all-material.controller";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/implementations/material.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getAllMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: IGetAllMaterialUseCase = new GetAllMaterialUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllMaterialController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
