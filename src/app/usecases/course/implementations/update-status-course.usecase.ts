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
} from "../../../repositories";
import { IUpdateStatusCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class UpdateStatusCourseUseCase implements IUpdateStatusCourseUseCase {
  constructor(
    private courseRepository: ICourseRepository,
    private notificationRepository: INotificationRepository,
    private chatGroupRepository: IChatGroupRepository
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

      const existingCourse = await this.courseRepository.findById(courseId);
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

      const updatedCourse = await this.courseRepository.updateStatusOfCourse(
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

      // Send notification to the mentor
      if (
        role === "admin" &&
        (newStatus === "approved" ||
          newStatus === "rejected" ||
          newStatus === "published")
      ) {
        await this.notificationRepository.create(notification);
        const io = getIo();
        if (io) {
          console.log(
            "Emitting notification to mentor:",
            updatedCourse.mentorId
          );
          io.to(updatedCourse.mentorId).emit(
            "receiveNotification",
            notification
          );
        }
      } else if (role === "mentor" && newStatus === "requested") {
        await this.notificationRepository.create(notification);
        const io = getIo();
        if (io) {
          console.log("Emitting notification to admin:");
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
        await this.chatGroupRepository.create(group);
      }

      return { data: { course: updatedCourse }, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
