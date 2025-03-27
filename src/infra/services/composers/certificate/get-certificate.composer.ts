import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../../app/repositories";
import {
  GetCertificateUseCase,
  IGetCertificateUseCase,
} from "../../../../app/usecases/certificate";
import { IController } from "../../../../presentation/http/controllers";
import { GetCertificateController } from "../../../../presentation/http/controllers/certificate";
import { CertificateModel, ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories";
import { CertificateRepository } from "../../../repositories/certificate.repository";

export function getCertificateComposer(): IController {
  const repository: ICertificateRepository = new CertificateRepository(
    CertificateModel
  );
  const progressRepository: IProgressRepository = new ProgressRepository(
    ProgressModel
  );
  const useCase: IGetCertificateUseCase = new GetCertificateUseCase(
    repository,
    progressRepository
  );
  const controller: IController = new GetCertificateController(useCase);
  return controller;
}
