import { Payload, QueryCourse, ResponseDTO } from "../../../../domain/dtos";
import { PaginationDTO } from "../../../../domain/dtos/pagination.dtos";
import { CourseErrorType } from "../../../../domain/enums";
import { ICourseRepository } from "../../../../infra/repositories";
import { IGetAllCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetAllCourseUseCase implements IGetAllCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(query: QueryCourse, authData: Payload): Promise<ResponseDTO> {
    try {
      const { userId, role } = authData;
      let courses: PaginationDTO | null = null;
      if (role === "admin") {
        courses = await this.courseRepository.findAll(query);
      } else if (role === "mentor") {
        courses = await this.courseRepository.findAllByMentorId(query, userId);
      } else {
        courses = await this.courseRepository.findAllPublished(query);
      }
      if (!courses || courses.total === 0) {
        return {
          success: false,
          data: { error: CourseErrorType.CourseNotFound },
        };
      }

      return { success: true, data: courses };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
