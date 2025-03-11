import { IMaterialRepository } from "../../../../app/repositories/material.repository";
import { LoginUseCase } from "../../../../app/usecases/auth/implementations/login-auth-usecase";
import { ILoginUseCase } from "../../../../app/usecases/auth/login-auth.usecase";
import {
  GetAllMaterialUseCase,
  ICreateMaterialUseCase,
  IGetAllMaterialUseCase,
} from "../../../../app/usecases/material";
import { CreateMaterialUseCase } from "../../../../app/usecases/material/implementation/create-material.usecase";
import { LoginController } from "../../../../presentation/http/controllers/auth/implementations/login.controller";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CreateMaterialController } from "../../../../presentation/http/controllers/material/create-material.controller";
import { GetAllMaterialController } from "../../../../presentation/http/controllers/material/get-all-material.controller";
import { GetAllUserController } from "../../../../presentation/http/controllers/user/implementations";
import MaterialRepository from "../../../repositories/material.repository";

export function createMaterialComposer(): IController {
  const repository: IMaterialRepository = new MaterialRepository();
  const useCase: ICreateMaterialUseCase = new CreateMaterialUseCase(repository);
  const controller: IController = new CreateMaterialController(useCase);
  return controller;
}
