import { IMaterialRepository } from "../../../../app/repositories/material.repository";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/login-auth.usecase";
import {
  GetAllMaterialUseCase,
  IGetAllMaterialUseCase,
} from "../../../../app/usecases/material";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllMaterialController } from "../../../../presentation/http/controllers/material/get-all-material.controller";
import MaterialRepository from "../../../repositories/material.repository";

export function getAllMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository();
  const useCase: IGetAllMaterialUseCase = new GetAllMaterialUseCase(repository);
  const controller: IController = new GetAllMaterialController(useCase);
  return controller;
}
