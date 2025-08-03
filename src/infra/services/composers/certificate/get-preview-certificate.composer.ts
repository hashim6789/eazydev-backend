import { ICertificateRepository } from "../../../repositories";
import { IController } from "../../../../presentation/http/controllers/IController";
import { CertificateModel } from "../../../databases/models";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";
import { CertificateRepository } from "../../../repositories/implementations/certificate.repository";
import { GetPreviewCertificateController } from "../../../../presentation/http/controllers/certificate";
import {
  GetPreviewCertificateUseCase,
  IGetPreviewCertificatesUseCase,
} from "../../../../app/usecases/certificate";

export function getPreviewCertificateComposer(): IController {
  const repository: ICertificateRepository = new CertificateRepository(
    CertificateModel
  );
  const useCase: IGetPreviewCertificatesUseCase =
    new GetPreviewCertificateUseCase(repository);
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetPreviewCertificateController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
