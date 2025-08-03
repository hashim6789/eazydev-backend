import {
  ICertificateRepository,
  INotificationRepository,
} from "../../../repositories";
import { GetAllNotificationUseCase } from "../../../../app/usecases/notification/implementations";
import { IGetAllNotificationUseCase } from "../../../../app/usecases/notification/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllNotificationController } from "../../../../presentation/http/controllers/notification/get-all-notification.controller";
import { CertificateModel, NotificationModel } from "../../../databases/models";
import { NotificationRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";
import { CertificateRepository } from "../../../repositories/implementations/certificate.repository";
import { GetAllCertificateController } from "../../../../presentation/http/controllers/certificate";
import { IGetAllCertificatesUseCase } from "../../../../app/usecases/certificate";
import { GetAllCertificateUseCase } from "../../../../app/usecases/certificate";

export function getAllCertificateComposer(): IController {
  const repository: ICertificateRepository = new CertificateRepository(
    CertificateModel
  );
  const useCase: IGetAllCertificatesUseCase = new GetAllCertificateUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllCertificateController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
