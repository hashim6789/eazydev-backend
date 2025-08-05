import { ResponseDTO } from "../../../../domain/dtos";
import { CourseErrorType } from "../../../../domain/enums";
import { ICourseRepository } from "../../../../infra/repositories";
import { IGetCourseUseCase } from "../interfaces";
import { formatErrorResponse } from "../../../../presentation/http/utils";

export class GetCourseUseCase implements IGetCourseUseCase {
  constructor(private _courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<ResponseDTO> {
    try {
      const course = await this._courseRepository.findByIdPopulate(courseId);
      if (!course) {
        return {
          success: false,
          data: { error: CourseErrorType.CourseNotFound },
        };
      }

      return { success: true, data: course };
    } catch (error: unknown) {
      return formatErrorResponse(error);
    }
  }
}
