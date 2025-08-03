import {
  IChatGroupRepository,
  ICourseRepository,
  INotificationRepository,
} from "../../../repositories";
import {
  IUpdateStatusCourseUseCase,
  UpdateStatusCourseUseCase,
} from "../../../../app/usecases/course";
import {
  IController,
  UpdateStatusCourseController,
} from "../../../../presentation/http/controllers";
import {
  ChatGroupModel,
  CourseModel,
  NotificationModel,
} from "../../../databases/models";
import {
  ChatGroupRepository,
  CourseRepository,
  NotificationRepository,
} from "../../../repositories/implementations";
import {
  HttpErrors,
  HttpSuccess,
  IHttpErrors,
  IHttpSuccess,
} from "../../../../presentation/http/helpers";

export function updateStatusCourseComposer(): IController {
  const repository: ICourseRepository = new CourseRepository(CourseModel);
  const notificationRepository: INotificationRepository =
    new NotificationRepository(NotificationModel);
  const chatGroupRepository: IChatGroupRepository = new ChatGroupRepository(
    ChatGroupModel
  );
  const useCase: IUpdateStatusCourseUseCase = new UpdateStatusCourseUseCase(
    repository,
    notificationRepository,
    chatGroupRepository
  );
  const httpErrors: IHttpErrors = new HttpErrors();
  const httpSuccess: IHttpSuccess = new HttpSuccess();
  const controller: IController = new UpdateStatusCourseController(
    useCase,
    httpErrors,
    httpSuccess
  );
  return controller;
}
