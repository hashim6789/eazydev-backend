import {
  IUpdateStatusCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { ChatGroupEntity } from "../../../../domain/entities/chat-group";
import { NotificationEntity } from "../../../../domain/entities/notification";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
} from "../../../../domain/enums";
import { env } from "../../../../presentation/express/configs/env.config";
import { getIo } from "../../../../presentation/express/settings/socket";
import {
  IChatGroupRepository,
  ICourseRepository,
  INotificationRepository,
} from "../../../../infra/repositories";
import { IUpdateStatusCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import { mapChatGroupToDocument } from "../../../../infra/databases/mappers";
import { mapNotificationToDocument } from "../../../../infra/databases/mappers/notification";

export class UpdateStatusCourseUseCase implements IUpdateStatusCourseUseCase {
  constructor(
    private _courseRepository: ICourseRepository,
    private _notificationRepository: INotificationRepository,
    private _chatGroupRepository: IChatGroupRepository
  ) {}

  async execute(
    { courseId, newStatus }: IUpdateStatusCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      const { role } = authData;
      if (role === "learner") {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      const existingCourse = await this._courseRepository.findById(courseId);
      if (!existingCourse) {
        return {
          data: { error: CourseErrorType.CourseFetchingFailed },
          success: false,
        };
      }

      switch (role) {
        case "mentor":
          if (newStatus === "requested" && existingCourse.status !== "draft") {
            return {
              data: { error: CourseErrorType.RequestStatusFailed },
              success: false,
            };
          } else if (
            newStatus === "draft" &&
            existingCourse.status !== "rejected"
          ) {
            return {
              data: { error: CourseErrorType.RequestStatusFailed },
              success: false,
            };
          }
          break;

        case "admin":
          if (
            newStatus === "approved" &&
            existingCourse.status !== "requested"
          ) {
            return {
              data: { error: CourseErrorType.ApproveStatusFailed },
              success: false,
            };
          } else if (
            newStatus === "rejected" &&
            existingCourse.status !== "requested"
          ) {
            return {
              data: { error: CourseErrorType.RejectStatusFailed },
              success: false,
            };
          } else if (
            newStatus === "published" &&
            existingCourse.status !== "approved"
          ) {
            return {
              data: { error: CourseErrorType.PublishStatusFailed },
              success: false,
            };
          }
          break;
      }

      const updatedCourse = await this._courseRepository.updateStatusOfCourse(
        courseId,
        newStatus
      );

      if (!updatedCourse || updatedCourse.status !== newStatus) {
        return {
          data: { error: CourseErrorType.CourseUpdateStatusFailed },
          success: false,
        };
      }

      const notification = NotificationEntity.create({
        title: "Course Status Update",
        message: `The status of your course "${
          updatedCourse.title
        }" has been updated to ${updatedCourse.status} by the ${
          role === "admin" ? "admin" : "mentor"
        }.`,
        recipientId:
          role === "admin" ? updatedCourse.mentorId : (env.ADMIN_ID as string),
        createdAt: Date.now(),
      });

      const mappedDocument = mapNotificationToDocument(notification);

      // Send notification to the mentor
      if (
        role === "admin" &&
        (newStatus === "approved" ||
          newStatus === "rejected" ||
          newStatus === "published")
      ) {
        await this._notificationRepository.create(mappedDocument);
        const io = getIo();
        if (io) {
          io.to(updatedCourse.mentorId).emit(
            "receiveNotification",
            notification
          );
        }
      } else if (role === "mentor" && newStatus === "requested") {
        await this._notificationRepository.create(mappedDocument);
        const io = getIo();
        if (io) {
          io.to(env.ADMIN_ID as string).emit(
            "receiveNotification",
            notification
          );
        }
      }

      if (role === "admin" && newStatus === "published") {
        const group = ChatGroupEntity.create({
          course: courseId,
          mentor: updatedCourse.mentorId,
          learners: [],
          createdAt: Date.now(),
        });
        await this._chatGroupRepository.create(mapChatGroupToDocument(group));
      }

      return { data: { course: updatedCourse }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
