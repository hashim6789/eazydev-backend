import {
  ICreateCourseRequestDTO,
  IUpdateCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CourseEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository } from "../../../repositories";
import { IUpdateCourseUseCase } from "../interfaces";

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

      const { mentorId, courseId, ...updateData } = data;
      const courseEntity = CourseEntity.update(updateData);

      const updatedCourse = await this.courseRepository.update(
        courseId,
        courseEntity
      );

      if (!createdCourse) {
        return {
          data: { error: CourseErrorType.CourseCreationFailed },
          success: false,
        };
      }

      return { data: { courseId: createdCourse.id }, success: true };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
