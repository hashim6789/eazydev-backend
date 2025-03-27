import { IMaterialRepository } from "../../../../app/repositories/material.repository";
import {
  IUpdateMaterialUseCase,
  UpdateMaterialUseCase,
} from "../../../../app/usecases/material";
import { UpdateMaterialController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/material.repository";

export function updateMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: IUpdateMaterialUseCase = new UpdateMaterialUseCase(repository);
  const controller: IController = new UpdateMaterialController(useCase);
  return controller;
}
