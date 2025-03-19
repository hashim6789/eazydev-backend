import { QueryCourse, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllCourseUseCase {
  execute(query: QueryCourse): Promise<ResponseDTO>;
}
