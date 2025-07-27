import {
  ICertificateRepository,
  IProgressRepository,
} from "../../../repositories";
import {
  GetCertificateUseCase,
  IGetCertificateUseCase,
} from "../../../../app/usecases/certificate";
import { IController } from "../../../../presentation/http/controllers";
import { GetCertificateController } from "../../../../presentation/http/controllers/certificate";
import { CertificateModel, ProgressModel } from "../../../databases/models";
import { ProgressRepository } from "../../../repositories/implementations";
import { CertificateRepository } from "../../../repositories/implementations/certificate.repository";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

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
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetCertificateController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
