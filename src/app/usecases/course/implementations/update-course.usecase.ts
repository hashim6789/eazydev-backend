import {
  IUpdateCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository } from "../../../../infra/repositories";
import { IUpdateCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class UpdateCourseUseCase implements IUpdateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(
    data: IUpdateCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (data.mentorId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }

      // Update the course properties

      const existingCourse = await this.courseRepository.findById(
        data.courseId
      );
      if (!existingCourse) {
        return {
          data: { error: CourseErrorType.CourseNotFound },
          success: false,
        };
      }

      const { mentorId, courseId, ...updateData } = data;

      Object.assign(existingCourse, updateData);

      const updatedCourse = await this.courseRepository.update(
        courseId,
        existingCourse
      );

      if (!updatedCourse) {
        return {
          data: { error: CourseErrorType.CourseCreationFailed },
          success: false,
        };
      }

      return { data: updatedCourse.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
