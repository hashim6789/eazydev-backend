import { QueryCourse, ResponseDTO } from "../../../../domain/dtos";
import { CourseErrorType } from "../../../../domain/enums";
import { ICourseRepository } from "../../../repositories";
import { IGetAllCourseUseCase } from "../interfaces";

export class GetAllCourseUseCase implements IGetAllCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(query: QueryCourse): Promise<ResponseDTO> {
    try {
      const courses = await this.courseRepository.findAll(query);
      if (courses.total === 0) {
        return {
          success: false,
          data: { error: CourseErrorType.CourseNotFound },
        };
      }

      return { success: true, data: courses };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
