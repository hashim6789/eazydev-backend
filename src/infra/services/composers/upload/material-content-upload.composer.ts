import { MaterialContentUploadUseCase } from "../../../../app/usecases/upload/implementation/material-conent-upload.usecase";
import { IMaterialContentUploadUseCase } from "../../../../app/usecases/upload/interface/material-conent-upload.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UploadMaterialContentController } from "../../../../presentation/http/controllers/upload/material-content-upload.controller";
import { IS3ServiceProvider } from "../../../providers";
import { S3ServiceProvider } from "../../../providers/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function uploadMaterialContentComposer(): IController {
  const s3ServiceProvider: IS3ServiceProvider = new S3ServiceProvider();
  const useCase: IMaterialContentUploadUseCase =
    new MaterialContentUploadUseCase(s3ServiceProvider);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UploadMaterialContentController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
