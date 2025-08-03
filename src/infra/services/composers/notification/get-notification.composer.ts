import { INotificationRepository } from "../../../repositories";
import { GetAllNotificationUseCase } from "../../../../app/usecases/notification/implementations";
import { IGetAllNotificationUseCase } from "../../../../app/usecases/notification/interfaces";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllNotificationController } from "../../../../presentation/http/controllers/notification/get-all-notification.controller";
import { NotificationModel } from "../../../databases/models";
import { NotificationRepository } from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function getNotificationComposer(): IController {
  const repository: INotificationRepository = new NotificationRepository(
    NotificationModel
  );
  const useCase: IGetAllNotificationUseCase = new GetAllNotificationUseCase(
    repository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new GetAllNotificationController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
