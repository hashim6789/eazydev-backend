import {
  ICreateCourseRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateCourseUseCase {
  execute(
    data: ICreateCourseRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
