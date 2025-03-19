import {
  ILessonRepository,
  INotificationRepository,
} from "../../../../app/repositories";
import { GetLessonUseCase } from "../../../../app/usecases/lesson/implementations";
import { IGetLessonUseCase } from "../../../../app/usecases/lesson/interfaces";
import { GetAllNotificationUseCase } from "../../../../app/usecases/notification/implementations";
import { IGetAllNotificationUseCase } from "../../../../app/usecases/notification/interfaces";
import { GetLessonController } from "../../../../presentation/http/controllers";
import { IController } from "../../../../presentation/http/controllers/IController";
import { GetAllNotificationController } from "../../../../presentation/http/controllers/notification/get-all-notification.comtroller";
import { INotification } from "../../../databases/interfaces";
import { LessonModel, NotificationModel } from "../../../databases/models";
import {
  LessonRepository,
  NotificationRepository,
} from "../../../repositories";

export function getNotificationComposer(): IController {
  const repository: INotificationRepository = new NotificationRepository(
    NotificationModel
  );
  const useCase: IGetAllNotificationUseCase = new GetAllNotificationUseCase(
    repository
  );
  const controller: IController = new GetAllNotificationController(useCase);
  return controller;
}
