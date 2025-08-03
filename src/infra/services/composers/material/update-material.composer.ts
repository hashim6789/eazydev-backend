import { IMaterialRepository } from "../../../repositories";
import {
  IUpdateMaterialUseCase,
  UpdateMaterialUseCase,
} from "../../../../app/usecases/material";
import { UpdateMaterialController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/implementations/material.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: IUpdateMaterialUseCase = new UpdateMaterialUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateMaterialController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
