import { ResponseDTO } from "../../../../domain/dtos";

export interface IGetCourseUseCase {
  execute(courseId: string): Promise<ResponseDTO>;
}
