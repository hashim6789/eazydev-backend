import {
  IUpdateStatusCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateCourseUseCase {
  execute(
    data: IUpdateStatusCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
