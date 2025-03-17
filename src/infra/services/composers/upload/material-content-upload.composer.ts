import { IS3ServiceProvider } from "../../../../app/providers";
import { MaterialContentUploadUseCase } from "../../../../app/usecases/upload/implementation/material-conent-upload.usecase";
import { IMaterialContentUploadUseCase } from "../../../../app/usecases/upload/interface/material-conent-upload.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UploadMaterialContentController } from "../../../../presentation/http/controllers/upload/material-content-upload.controller";
import { S3ServiceProvider } from "../../../providers";

export function uploadMaterialContentComposer(): IController {
  const s3ServiceProvider: IS3ServiceProvider = new S3ServiceProvider();
  const useCase: IMaterialContentUploadUseCase =
    new MaterialContentUploadUseCase(s3ServiceProvider);
  const controller: IController = new UploadMaterialContentController(useCase);
  return controller;
}
