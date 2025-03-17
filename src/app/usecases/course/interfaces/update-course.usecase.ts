import {
  IUpdateCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateCourseUseCase {
  execute(
    data: IUpdateCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
