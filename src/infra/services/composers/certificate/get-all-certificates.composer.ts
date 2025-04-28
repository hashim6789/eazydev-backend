import { ICertificateRepository } from "../../../../app/repositories";
import {
  GetAllCertificateUseCase,
  IGetAllCertificateUseCase,
} from "../../../../app/usecases/certificate";
import { IController } from "../../../../presentation/http/controllers";
import { GetAllCertificatesController } from "../../../../presentation/http/controllers/certificate";
import { CertificateModel } from "../../../databases/models";
import { CertificateRepository } from "../../../repositories/certificate.repository";

export function getAllCertificateComposer(): IController {
  const repository: ICertificateRepository = new CertificateRepository(
    CertificateModel
  );
  const useCase: IGetAllCertificateUseCase = new GetAllCertificateUseCase(
    repository
  );
  const controller: IController = new GetAllCertificatesController(useCase);
  return controller;
}
