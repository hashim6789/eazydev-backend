import { IMaterialRepository } from "../../../../app/repositories/material.repository";

import { GetMaterialUseCase } from "../../../../app/usecases/material/implementation/get-material.usecase";
import { IGetMaterialUseCase } from "../../../../app/usecases/material/interface/get-material.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetMaterialController } from "../../../../presentation/http/controllers/material/get-material.controller";
import MaterialRepository from "../../../repositories/material.repository";

export function updateMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository();
  const useCase: IGetMaterialUseCase = new GetMaterialUseCase(repository);
  const controller: IController = new GetMaterialController(useCase);
  return controller;
}
