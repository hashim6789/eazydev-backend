import {
  ICreateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface ICreateLessonUseCase {
  execute(
    data: ICreateLessonRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
