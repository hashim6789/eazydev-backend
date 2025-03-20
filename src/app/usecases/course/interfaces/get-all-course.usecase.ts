import { Payload, QueryCourse, ResponseDTO } from "../../../../domain/dtos";

export interface IGetAllCourseUseCase {
  execute(query: QueryCourse, authData: Payload): Promise<ResponseDTO>;
}
