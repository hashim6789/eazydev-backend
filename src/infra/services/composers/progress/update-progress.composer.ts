import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../repositories";
import {
  IUpdateProgressUseCase,
  UpdateProgressUseCase,
} from "../../../../app/usecases/progress";
import { IController } from "../../../../presentation/http/controllers/IController";
import { UpdateProgressController } from "../../../../presentation/http/controllers/progress";
import { CertificateModel, ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories/implementations";
import { CertificateRepository } from "../../../repositories/implementations/certificate.repository";

export function updateProgressComposer(): IController {
  const repository: IProgressRepository = new ProgressRepository(ProgressModel);
  const certificateRepository: ICertificateRepository =
    new CertificateRepository(CertificateModel);
  const useCase: IUpdateProgressUseCase = new UpdateProgressUseCase(
    repository,
    certificateRepository
  );
  const controller: IController = new UpdateProgressController(useCase);
  return controller;
}
