import { IS3ServiceProvider } from "../../../../app/providers";
import { IProgressRepository } from "../../../../app/repositories";
import {
  GetSignedUrlUseCase,
  IGetLearningContentsUseCase,
  IGetSignedUrlUseCase,
} from "../../../../app/usecases/progress";
import { GetLearningContentUseCase } from "../../../../app/usecases/progress/implementations/get-learning-content.usecase";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetLearningContentController } from "../../../../presentation/http/controllers/progress";
import { GetSignedUrlController } from "../../../../presentation/http/controllers/progress/get-signed-url.controller";
import { ProgressModel } from "../../../databases/models";
import { S3ServiceProvider } from "../../../providers";
import { ProgressRepository } from "../../../repositories";

export function getSingedUrlComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const s3ServiceProvider: IS3ServiceProvider = new S3ServiceProvider();
  const useCase: IGetSignedUrlUseCase = new GetSignedUrlUseCase(
    repository,
    s3ServiceProvider
  );
  const controller: IController = new GetSignedUrlController(useCase);
  return controller;
}
