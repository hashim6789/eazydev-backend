import { IMaterialRepository } from "../../../repositories";
import { ICreateMaterialUseCase } from "../../../../app/usecases/material";
import { CreateMaterialUseCase } from "../../../../app/usecases/material/implementation/create-material.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CreateMaterialController } from "../../../../presentation/http/controllers/material/create-material.controller";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/implementations/material.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function createMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: ICreateMaterialUseCase = new CreateMaterialUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new CreateMaterialController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
