import { IMaterialRepository } from "../../../repositories";
import { GetMaterialUseCase } from "../../../../app/usecases/material/implementation/get-material.usecase";
import { IGetMaterialUseCase } from "../../../../app/usecases/material/interface/get-material.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetMaterialController } from "../../../../presentation/http/controllers/material/get-material.controller";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/implementations/material.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: IGetMaterialUseCase = new GetMaterialUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetMaterialController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
