import {
  IUpdateLessonRequestDTO,
  Payload,
  ResponseDTO,
} from "../../../../domain/dtos";

export interface IUpdateLessonUseCase {
  execute(
    data: IUpdateLessonRequestDTO,
    authData: Payload
  ): Promise<ResponseDTO>;
}
