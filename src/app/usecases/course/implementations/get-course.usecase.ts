import { ResponseDTO } from "../../../../domain/dtos";
import { CourseErrorType } from "../../../../domain/enums";
import { ICourseRepository } from "../../../repositories";
import { IGetCourseUseCase } from "../interfaces";

export class GetCourseUseCase implements IGetCourseUseCase {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<ResponseDTO> {
    try {
      const course = await this.courseRepository.findByIdPopulate(courseId);
      if (!course) {
        return {
          success: false,
          data: { error: CourseErrorType.CourseNotFound },
        };
      }

      return { success: true, data: course };
    } catch (error: any) {
      return { data: { error: error.message }, success: false };
    }
  }
}
