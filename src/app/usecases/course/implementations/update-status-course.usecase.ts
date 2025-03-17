import {
  IUpdateStatusCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository } from "../../../repositories";
import { IUpdateStatusCourseUseCase } from "../interfaces";

export class UpdateStatusCourseUseCase implements IUpdateStatusCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(
    { courseId, newStatus }: IUpdateStatusCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (authData.role === "learner") {
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

      switch (authData.role) {
        case "mentor":
          if (
            newStatus === "completed" &&
            !["draft", "rejected"].includes(existingCourse.status)
          ) {
            return {
              data: { error: CourseErrorType.CompleteStatusFailed },
              success: false,
            };
          } else if (
            newStatus === "requested" &&
            existingCourse.status !== "completed"
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

      const isUpdated = await this.courseRepository.updateStatusOfCourse(
        courseId,
        newStatus
      );

      if (!isUpdated) {
        return {
          data: { error: CourseErrorType.CourseCreationFailed },
          success: false,
        };
      }

      return { data: { success: isUpdated }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
