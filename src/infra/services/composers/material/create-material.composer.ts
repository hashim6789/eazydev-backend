import { IMaterialRepository } from "../../../../app/repositories/material.repository";
import { ICreateMaterialUseCase } from "../../../../app/usecases/material";
import { CreateMaterialUseCase } from "../../../../app/usecases/material/implementation/create-material.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CreateMaterialController } from "../../../../presentation/http/controllers/material/create-material.controller";
import { MaterialModel } from "../../../databases/models";
import MaterialRepository from "../../../repositories/material.repository";

export function createMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository(MaterialModel);
  const useCase: ICreateMaterialUseCase = new CreateMaterialUseCase(repository);
  const controller: IController = new CreateMaterialController(useCase);
  return controller;
}
