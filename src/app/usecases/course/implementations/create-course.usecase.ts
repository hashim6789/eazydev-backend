import {
  ICreateCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";
import { CourseEntity } from "../../../../domain/entities";
import {
  AuthenticateUserErrorType,
  CourseErrorType,
} from "../../../../domain/enums";
import { ICourseRepository } from "../../../repositories";
import { ICreateCourseUseCase } from "../interfaces";

export class CreateCourseUseCase implements ICreateCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(
    {
      title,
      categoryId,
      description,
      mentorId,
      thumbnail,
      price,
    }: ICreateCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO> {
    try {
      if (mentorId !== authData.userId) {
        return {
          data: { error: AuthenticateUserErrorType.UserCanNotDoIt },
          success: false,
        };
      }
      const courseEntity = CourseEntity.create({
        title,
        categoryId,
        description,
        mentorId,
        thumbnail,
        price,
        lessons: [],
        status: "draft",
      });

      courseEntity.status;

      const createdCourse = await this.courseRepository.create(courseEntity);

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
