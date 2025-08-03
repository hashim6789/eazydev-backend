import { IProgressRepository } from "../../../repositories";
import {
  GetSignedUrlUseCase,
  IGetSignedUrlUseCase,
} from "../../../../app/usecases/progress";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetSignedUrlController } from "../../../../presentation/http/controllers/progress/get-signed-url.controller";
import { ProgressModel } from "../../../databases/models";
import { IS3ServiceProvider } from "../../../providers";
import { S3ServiceProvider } from "../../../providers/implementations";
import { ProgressRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getSingedUrlComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const s3ServiceProvider: IS3ServiceProvider = new S3ServiceProvider();
  const useCase: IGetSignedUrlUseCase = new GetSignedUrlUseCase(
    repository,
    s3ServiceProvider
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetSignedUrlController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
