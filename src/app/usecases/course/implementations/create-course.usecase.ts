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
import { ICourseRepository } from "../../../../infra/repositories";
import { ICreateCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";
import {
  mapCourseToDocument,
  mapCourseToDTO,
} from "../../../../infra/databases/mappers";

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
      console.log(authData);
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

      const createdCourse = await this.courseRepository.create(
        mapCourseToDocument(courseEntity)
      );

      if (!createdCourse) {
        return {
          data: { error: CourseErrorType.CourseCreationFailed },
          success: false,
        };
      }

      const mappedCourse = mapCourseToDTO(createdCourse);

      return { data: mappedCourse.id, success: true };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
