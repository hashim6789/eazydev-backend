import {
  IUpdateStatusCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateStatusCourseUseCase {
  execute(
    data: IUpdateStatusCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
